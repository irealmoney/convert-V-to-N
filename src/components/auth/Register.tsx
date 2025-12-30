"use client";


import React, { useState, useContext, FormEvent, Key } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { AuthContext } from "./../../context/AuthContext";

import { useLoading } from './../../context/LoadingContext';


interface RegisterFormProps {
  switchFormHandler: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchFormHandler }) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const authContext = useContext(AuthContext);
    const { loading, showLoading, hideLoading } = useLoading();

    const router = useRouter();

    const [step, setStep] = useState("register");
    const [phonenumber, setPhonenumber] = useState<string | undefined>(undefined);
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

    const { value: firstname, error: firstnameError, onChange: handleFirstnameChange, reset: resetFirstname } = useFormInput('');
    const { value: lastname, error: lastnameError, onChange: handleLastnameChange, reset: resetLastname } = useFormInput('');
    const { value: phoneNumber, error: phoneNumberError, onChange: handlePhoneNumberChange, reset: resetPhoneNumber } = useFormInput('', (value) => /^[0-9]{10}$/.test(value));  // اعتبارسنجی شماره موبایل
    const { value: email, error: emailError, onChange: handleEmailChange, reset: resetEmail } = useFormInput('');
    const { value: password, error: passwordError, onChange: handlePasswordChange, reset: resetPassword } = useFormInput('');

    const resetForm = () => {
        resetFirstname();
        resetLastname();
        resetPhoneNumber();
        resetEmail();
        resetPassword();
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let value = e.target.value;
    if (value.length > 1) value = value.slice(0, 1); // Only one character
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // If the input is filled, move focus to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const codevalue = `${code?.[0]}${code?.[1]}${code?.[2]}${code?.[3]}${code?.[4]}${code?.[5]}`;

  const FormSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      toast.error("تایید نشده recaptcha", {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    const token = await executeRecaptcha("submit");

    let data = {
      firstname: firstname,
      lastname: lastname,
      phonenumber: phoneNumber,
      email: email,
      password: password,
      captchaToken: token
    }

    try {
      showLoading(); // نمایش لودینگ
      let res = await axios.post("http://127.0.0.1:8000/api/v1/register", data, { withCredentials: true });

      if (res.data.success === true) {
        toast.info(res.data.message, {
          position: "top-left",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setStep("OTP");
        setPhonenumber(data.phonenumber);
        resetForm();
      } else {
        if (Array.isArray(res.data?.data)) {
          res.data?.data?.forEach((msg : string, index : Key) => {
            toast.error(msg, {
              position: "top-left",
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
          });
        }

        toast.error(res.data.data, {
          position: "top-left",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور", {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } finally {
      hideLoading(); // مخفی کردن لودینگ
    }
  }

  const OTPverifyFormHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      toast.error("تایید نشده recaptcha", {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    const token = await executeRecaptcha("submit");

    try {
        showLoading();
      let res = await axios.post("http://127.0.0.1:8000/api/v1/verify-otp", {
        phonenumber,
        code: codevalue,
        captchaToken: token
      }, { withCredentials: true });

      if (res.data.success === true) {
        toast.success('عضویت موفقیت آمیز بود', {
          position: "top-left",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        hideLoading();

        setTimeout(() => {
          router.push('/');
          showLoading();
        }, 2000);
      } else {
        hideLoading();
        if (Array.isArray(res.data?.data)) {
          res.data?.data?.forEach((msg : string, index : Key) => {
            toast.error(msg, {
              position: "top-left",
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
          });
        }
        toast.error(res.data.data, {
          position: "top-left",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } catch (err) {
      toast.error('خطا در ارتباط با سرور ', {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } finally {
      hideLoading();
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <ToastContainer className="font-bold" />

      <div className="flex flex-col w-3/6 h-screen items-center justify-center">

        {step === "register" && (
          <>
            <form onSubmit={FormSubmitHandler} className="w-full mt-auto">
              <div className="my-6 border-b-2">
                <h2 className="text-3xl font-bold text-center">!سلام رفیق</h2>
                <p className="text-center my-3"> به نیک پت شاپ خوش اومدی ! برای عضویت فیلد های زیر را پر کن</p>
              </div>

              <div className="flex flex-row-reverse justify-between mb-4">
                <div className="w-full ml-1">
                  <label htmlFor="firstname" className="block text-right mb-2 text-sm font-medium">نام</label>
                  <input
                    type="text"
                    id="firstname"
                    className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                    value={firstname}
                    onChange={handleFirstnameChange}
                  />
                </div>

                <div className="w-full mr-1">
                  <label htmlFor="lastname" className="block text-right mb-2 text-sm font-medium">نام خانوادگی</label>
                  <input
                    type="text"
                    id="lastname"
                    className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                    value={lastname}
                    onChange={handleLastnameChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block  text-right mb-2 text-sm font-medium">شماره موبایل</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                  placeholder="0911***9999"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block  text-right mb-2 text-sm font-medium">(اختیاری) ایمیل</label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-100 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500 outline-none focus:border-orange-500 w-full py-2.5 px-4"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={handleEmailChange}
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

              <div className="flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="text-white cursor-pointer duration-500 bg-[#F15A22] hover:bg-orange-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                >
                  عضویت
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-auto">
              <button
                onClick={switchFormHandler}
                className="rounded-t-xl cursor-pointer py-2 px-4 bg-[#F15A22] text-white duration-500 hover:text-[#F15A22] hover:bg-white border border-b-0 hover:border-[#F15A22] shadow-xl"
              >
                ورود به حساب کاربری
              </button>
            </div>
          </>
        )}

        {step === "OTP" && (
          <>
            <form onSubmit={OTPverifyFormHandler} className="max-w-sm mx-auto flex flex-col justify-center">
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
                className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
              >
                تایید
              </button>
            </form>
          </>
        )}

      </div>

    </div>
  )
}

export default RegisterForm;