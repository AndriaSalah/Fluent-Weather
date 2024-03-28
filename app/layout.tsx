import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/app/Stores/Providers";
import React from "react";

const inter = Inter({subsets: ["latin"]});

// export const metadata: Metadata = {
//     title: "Fluent Weather",
//     description: "A sleek looking weather app that will tell you everything you need to know about the weather around the world",
// };

const APP_NAME = "Fluent Weather";
const APP_DEFAULT_TITLE = "PWA";
const APP_TITLE_TEMPLATE = "%s - Fluent Weather PWA";
const APP_DESCRIPTION = "A sleek looking weather app that will tell you everything you need to know about the weather around the world";

export const metadata: Metadata = {

    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};
export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    interactiveWidget:"resizes-visual",
    themeColor: "#78a3cb"


}


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className +" "}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
