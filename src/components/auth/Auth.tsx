"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import { useLoading } from "@/context/LoadingContext";

export default function Auth() {
    const [switchForm , setSwitchForm] = useState(false)
    const {loading , showLoading, hideLoading } = useLoading();
    const switchFormHandler = () => {
        setSwitchForm(!switchForm);
    }

    useEffect(() => {
      document.body.classList.add("overflow-hidden");
    
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [])

    return (
        loading ? ''
            :
        (<div className={`h-screen w-full flex items-center z-10 relative overflow-hidden`}>
            {/* پس‌زمینه */}
            <div className="absolute inset-0 h-screen w-screen bg-[#F15A22] -z-10 overflow-hidden">
            <img
                src="/NIK-LOGO-white.svg"
                alt="Logo"
                className={`w-1/4 absolute right-50 top-1/2 -translate-y-1/2 duration-1000 ease-in-out ${switchForm ? 'transform translate-x-500' : 'transform -translate-x-6'}`}
            />
            </div>

            <div className="absolute inset-0 h-screen w-screen -z-10 overflow-hidden">
            <img
                src="/NIK-LOGO-white.svg"
                alt="Logo"
                className={`w-1/4 absolute left-50 top-1/2 -translate-y-1/2 duration-1000 ease-in-out ${!switchForm ? 'transform -translate-x-500' : 'transform -translate-x-6'}`}
            />
            </div>

            {/* محتوای فرم */}
            <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                    {switchForm ? (
                    <motion.div
                        key="register"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute right-0 w-3/6 h-full flex items-center justify-center"
                    >
                        <RegisterForm switchFormHandler={switchFormHandler} />
                    </motion.div>
                    ) : (
                    <motion.div
                        key="login"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute left-0 w-3/6 h-full flex items-center justify-center"
                    >
                        <LoginForm switchFormHandler={switchFormHandler} />
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>)
    )

}