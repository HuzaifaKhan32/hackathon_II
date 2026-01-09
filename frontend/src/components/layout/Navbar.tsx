"use client";

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b-0 border-b-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                        <span className="material-symbols-outlined text-2xl">smart_toy</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white dark:text-white text-slate-900 group-hover:text-primary transition-colors duration-300">Todo AI</span>
                </Link>
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    <Link className="text-sm font-medium text-slate-600 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors relative group" href="#">
                        Features
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link className="text-sm font-medium text-slate-600 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors relative group" href="#">
                        Pricing
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link className="text-sm font-medium text-slate-600 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors relative group" href="#">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                </nav>
                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="hidden md:block text-sm font-medium text-slate-700 dark:text-white hover:text-primary transition-colors">Dashboard</Link>
                            <button 
                                onClick={logout}
                                className="flex items-center justify-center rounded-full h-10 px-6 bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="hidden md:block text-sm font-medium text-slate-700 dark:text-white hover:text-primary transition-colors">Login</Link>
                            <Link href="/sign-up" className="flex items-center justify-center rounded-full h-10 px-6 bg-primary text-white dark:bg-white dark:text-background-dark text-sm font-bold hover:bg-primary-dark dark:hover:bg-gray-200 transition-colors shadow-lg shadow-primary/20 dark:shadow-white/10">
                                Sign Up
                            </Link>
                        </>
                    )}
                    <button className="md:hidden text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;