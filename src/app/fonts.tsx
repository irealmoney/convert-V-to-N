import localFont from 'next/font/local'

export const LahzeeFont = localFont({
    src: [{
        path : "../assets/fonts/Lahzeh-Regular.ttf",
        weight: "400",
        style: "normal"
    }] ,
    variable: "--font-lahzee",
    display: "swap",
})
export const LahzeeBoldFont = localFont({
    src: [
        { path: "../assets/fonts/Lahzeh-Thin.ttf", weight: "100", style: "normal" },
        { path: "../assets/fonts/Lahzeh-ExtraLight.ttf", weight: "200", style: "normal" },
        { path: "../assets/fonts/Lahzeh-Light.ttf", weight: "300", style: "normal" },
        { path: "../assets/fonts/Lahzeh-Regular.ttf", weight: "400", style: "normal" },
        { path: "../assets/fonts/Lahzeh-Medium.ttf", weight: "500", style: "normal" },
        { path: "../assets/fonts/Lahzeh-SemiBold.ttf", weight: "600", style: "normal" },
        { path: "../assets/fonts/Lahzeh-Bold.ttf", weight: "700", style: "normal" },
        { path: "../assets/fonts/Lahzeh-ExtraBold.ttf", weight: "800", style: "normal" },
        { path: "../assets/fonts/Lahzeh-Black.ttf", weight: "900", style: "normal" },
    ] ,
    variable: "--font-lahzee",
    display: "swap",
})