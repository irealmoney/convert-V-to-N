"use client";

import { useContext, useState, FormEvent, useEffect } from "react";
import { useFormInput } from "./../../hooks/useFormInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from './../../context/AuthContext'
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLoading } from "./../../context/LoadingContext";
import { time } from "console";

interface LoginFormProps {
  switchFormHandler: () => void;
}

export default function LoginForm({ switchFormHandler }: LoginFormProps) {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const authContext = useContext(AuthContext);
    const router = useRouter(); 

    const { showLoading, hideLoading } = useLoading();
    const [Otpon, setOtpOn] = useState<boolean>(false);
    const [phonenumber, setPhonenumber] = useState<string | undefined>(undefined);
    const [Step, setStep] = useState<string>('code-req');
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

    useEffect(() => {
        showLoading();
        setTimeout(() => {
            hideLoading();
        }, 1000);
    }, []);

    const {
        value: phoneNumber,
        error: phoneNumberError,
        onChange: handlePhoneNumberChange,
        reset: resetPhoneNumber,
    } = useFormInput('', (value) => /^[0-9]{10}$/.test(value)); 

    const {
        value: password,
        error: passwordError,
        onChange: handlePasswordChange,
        reset: resetPassword,
    } = useFormInput(''); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = e.target.value;
        if (value.length > 1) value = value.slice(0, 1); 
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);


        if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
        }
    };
    
    const codevalue = `${code?.[0]}${code?.[1]}${code?.[2]}${code?.[3]}${code?.[4]}${code?.[5]}`;

    const showOtpForm = () => {
        setOtpOn(!Otpon);
    };

    let data: { phonenumber: any; captchaToken?: string } = {
        phonenumber: phoneNumber
    };

    const MakeLoginOTP = async (event: FormEvent) => {
        event.preventDefault();
        showLoading();

        if (!executeRecaptcha) {
            toast.error("تایید نشده recaptcha", { position: "top-left", autoClose: 7000 });
            hideLoading();
            return;
        }

        const token = await executeRecaptcha("submit");

        data = { ...data, captchaToken: token };

        let res = await axios.post("http://localhost:8000/api/v1/make-login-otp", data, { withCredentials: true });
        if (res.data.success === true) {
            toast.success(res.data.message, { position: "top-right", autoClose: 7000 });
            setStep("code-verify");
            setPhonenumber(data.phonenumber);
            hideLoading();
        } else {
            toast.error(res.data.data, { position: "top-right", autoClose: 7000 });
            hideLoading();
        }
    };

    const OTPverifyFormHandler = async (event: FormEvent) => {
        event.preventDefault();
        showLoading();
        if (!executeRecaptcha) {
            toast.error("تایید نشده recaptcha", { position: "top-left", autoClose: 7000 });
            hideLoading();
            return;
        }

        const token = await executeRecaptcha("submit");

        let res = await axios.post("http://localhost:8000/api/v1/verify-otp", {
        phonenumber,
        code: codevalue,
        captchaToken: token
        }, { withCredentials: true });

        if (res.data.success === true) {
            toast.success('عضویت موفقیت آمیز بود', { position: "top-right", autoClose: 7000 });
            resetPassword();
            resetPhoneNumber();
            hideLoading();
            setTimeout(() => {
                router.push('/'); // هدایت به صفحه اصلی با استفاده از useRouter
            }, 1000);
        } else {
            hideLoading();
            toast.error(res.data.data, { position: "top-right", autoClose: 7000 });
            resetPassword();
            resetPhoneNumber();
        }
    };

    const FormSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        showLoading();
        if (!executeRecaptcha) {
            toast.error("تایید نشده recaptcha", { position: "top-left", autoClose: 7000 });
            hideLoading();
            return;
        }

        const token = await executeRecaptcha("submit");

        let data = {
        pp: {
            phonenumber: phoneNumber,
            password: password,
        },
        captchaToken: token
        };

        try {
        let res = await axios.post("http://localhost:8000/api/v1/login", data, { withCredentials: true });
        if (res.data.success === true) {
            toast.success('ورود موفقیت آمیز بود', { position: "top-right", autoClose: 7000 });
            resetPassword();
            resetPhoneNumber();
            setTimeout(() => {
            hideLoading();
            router.push('/'); // هدایت به صفحه اصلی پس از ورود موفق
            showLoading();
            }, 2000);
        } else {
            toast.error(res.data.data, { position: "top-right", autoClose: 7000 });
            resetPassword();
            resetPhoneNumber();
        }
        } catch (err) {
            toast.error('خطا در ارتباط با سرور');
        } finally {
            hideLoading();
        }
    };


    return(
    
    <div className="flex items-center justify-center w-full h-screen bg-white">
        <ToastContainer className="font-bold"/>
        
        <div className="flex flex-col w-3/6 h-screen items-center justify-center">

            { !Otpon ? (

                <form onSubmit={FormSubmitHandler} className="w-full mt-auto">
                <div className="my-6 border-b-2">
                    <h2 className="text-3xl font-bold text-center">!سلام رفیق</h2>
                    <p className="text-center my-3">خوش برگشتی ! اگه عضو نیک پت شاپ هستی ، وارد شو</p>
                </div>

                    <div className="mb-4">
                    <label htmlFor="phonenumber" className="block text-right mb-2 text-sm font-medium">شماره موبایل</label>
                    <input
                        placeholder="0911***9999"
                        type="text"
                        id="phonenumber"
                        className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="block text-right mb-2 text-sm font-medium">کلمه عبور</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                        placeholder="*********"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    </div>
                    <div>
                    <p className="text-red-500 pb-5"></p>
                    </div>
                    <div className="flex flex-row-reverse items-center justify-between mb-4">
                        <button
                            type="submit"
                            className="text-white cursor-pointer duration-500 border-[#F15A22] border-2 hover:border-orange-700 bg-[#F15A22] hover:bg-orange-700  font-medium rounded-lg text-sm py-2 px-5 w-full sm:w-auto"
                        >
                            ورود
                        </button>

                        <button
                            onClick={showOtpForm}
                            type="button"
                            className="text-[#F15A22] cursor-pointer duration-500 bg-white border-[#F15A22] border-2 border-dashed hover:bg-[#F15A22] hover:text-white font-medium rounded-lg text-sm py-2 px-5 w-full sm:w-auto"
                        >
                            ورود با کد تایید
                        </button>

                    </div>

                </form>

            ) : Step === 'code-req' ? (
                
                    <form onSubmit={MakeLoginOTP} className="w-full mt-auto">
                        <div className="my-6 border-b-2">
                            <h2 className="text-3xl font-bold text-center">!سلام رفیق</h2>
                            <p className="text-center my-3">خوش برگشتی ! اگه عضو نیک پت شاپ هستی ، وارد شو</p>
                        </div>

                        <div className="mb-4">
                        <label htmlFor="phonenumber" className="block text-right mb-2 text-sm font-medium">شماره موبایل</label>
                        <input
                            type="text"
                            id="phonenumber"
                            className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        </div>
                        <div>
                        <p className="text-red-500 pb-5"></p>
                        </div>
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <button
                                type="submit"
                                className="text-white duration-500 cursor-pointer border-[#F15A22] border-2 bg-[#F15A22] hover:border-orange-700 hover:bg-orange-700  font-medium rounded-lg text-sm py-2 px-5 w-full sm:w-auto"
                            >
                                ارسال
                            </button>

                            <button
                                onClick={showOtpForm}
                                type="button"
                                className="flex flex-row items-center cursor-pointer m-0 text-[#F15A22] duration-500 bg-white  border-[#F15A22]  border-2 border-dashed hover:bg-[#F15A22] hover:text-white font-medium rounded-lg text-sm py-2 px-5 w-full sm:w-auto"
                            >
                                <IoMdArrowRoundBack />
                                بازگشت
                            </button>

                        </div>

                    </form>
                ) : (
                    
                    <form onSubmit={OTPverifyFormHandler} className="max-w-sm mx-auto mt-auto flex flex-col justify-center">
                        <div className="flex mb-2 justify-evenly">
                            {code.map((digit, index) => (
                            <div key={index}>
                                <label htmlFor={`code-${index}`} className="sr-only">
                                Code {index + 1}
                                </label>
                                <input
                                type="text"
                                id={`code-${index}`}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                className="block w-9 h-16 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                required
                                />
                            </div>
                            ))}
                        </div>
                        <p className="my-4 text-sm text-gray-500">کد 6 رقمی ارسال شده به شماره موبایل را وارد کنید</p>
                        <button
                            type="submit"
                            className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto">
                            تایید
                        </button>
                    </form>
                )
            }


            <div className="flex justify-center mt-auto">
                <button
                    onClick={switchFormHandler}
                    className="rounded-t-xl cursor-pointer py-2 px-4 bg-[#F15A22] text-white duration-500 hover:text-[#F15A22] hover:bg-white border border-b-0 hover:border-[#F15A22] shadow-xl"
                >
                        ساخت حساب کاربری
                </button> 
            </div>

        </div>
        


 
    </div>
    )
};
