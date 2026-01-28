"use client";

import RecaptchaProvider from "@/providers/RecaptchaProvider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RecaptchaProvider>
            {children}
        </RecaptchaProvider>
    )
}