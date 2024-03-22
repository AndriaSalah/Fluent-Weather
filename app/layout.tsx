import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/app/Stores/Providers";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Fluent Weather",
    description: "A sleek looking weather app that will tell you everything you need to know about the weather around the world",
};
export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    interactiveWidget:"resizes-visual",

}

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
