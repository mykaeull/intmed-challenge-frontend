import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Toaster } from "./components/toaster";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggleButton from "./components/theme-toggle-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home",
    description: "Medicar App",
    icons: {
        icon: [{ url: "/logo.svg" }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <Toaster />
                    <ThemeToggleButton />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
