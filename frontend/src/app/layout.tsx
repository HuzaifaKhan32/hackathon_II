import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Ensure this is imported first
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/app/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Use next/font for Google Fonts for better performance and self-hosting
import { Space_Grotesk, Noto_Sans } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Todo AI - Evolution of Productivity",
  description: "AI-Powered task management that never sleeps. Experience the future of productivity with a chatbot that anticipates your needs before you do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Material Symbols Outlined link - placed here as it's a global icon font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`bg-main-bg-light dark:bg-main-bg-dark ${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} ${notoSans.variable} font-display text-white overflow-x-hidden selection:bg-primary/30 selection:text-white antialiased`}
      >
        <Providers>
          <AuthProvider>
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Stripes */}
              <div className="absolute inset-0 bg-stripes opacity-30"></div>
              {/* Gradient Orbs/Glows */}
              <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
              <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
              {/* Particles */}
              <div className="particle w-1 h-1 top-[15%] left-[10%] animate-pulse"></div>
              <div className="particle w-2 h-2 top-[35%] right-[20%] animate-pulse-slow bg-cyan-400 blur-[1px]"></div>
              <div className="particle w-1.5 h-1.5 bottom-[25%] left-[30%] animate-pulse bg-pink-400 blur-[1px]"></div>
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}