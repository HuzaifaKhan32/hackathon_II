"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api'; // Corrected to named export based on build error
// If api is not default, I might need { api }. But user error showed "api.post".

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    try {
        await api.post('/signup', {
            email,
            password,
            name: email.split('@')[0],
        });
        
        // On success, redirect to verify page
        window.location.href = `/verify?email=${encodeURIComponent(email)}`;
    } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || "Failed to create account");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="dark contents">
      <div className="bg-background-light dark:bg-background-dark font-display h-screen w-full overflow-hidden flex text-slate-900 dark:text-white selection:bg-primary selection:text-white">
        {/* Split Screen Container */}
        <div className="flex w-full h-full relative">
          {/* Background Gradients (Global Ambient) */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Left Panel: Visuals & Branding */}
          <div className="hidden lg:flex lg:w-1/2 h-full relative flex-col justify-center items-center p-12 overflow-hidden bg-[#0d0915]">
            {/* Decorative Background Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4a4458 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            {/* Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-primary via-accent to-secondary opacity-30 blur-[80px] rounded-full"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-lg">
              {/* 3D Floating Elements Simulation */}
              <div className="relative h-[500px] w-full">
                {/* Card 1 */}
                <div className="absolute top-10 left-0 w-64 p-5 rounded-2xl bg-gradient-to-br from-[#2a2438] to-[#151022] border border-white/10 shadow-2xl animate-float backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                    </div>
                    <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-white/5 rounded-full"></div>
                  </div>
                </div>

                {/* Card 2 (Main Focus) */}
                <div className="absolute top-32 right-0 w-72 p-6 rounded-2xl bg-gradient-to-br from-[#362e4a] to-[#1e182d] border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float-delayed z-20" style={{ animationDelay: '1s' }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">smart_toy</span>
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-bold">AI Assistant</h3>
                        <p className="text-xs text-slate-400">Suggesting tasks...</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-400 font-mono">NOW</span>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 mb-3 border border-white/5">
                    <p className="text-sm text-slate-300 leading-relaxed">&quot;I&apos;ve set up your workspace. Ready to get started?&quot;</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors">Let&apos;s Go</button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="absolute bottom-20 left-10 w-56 p-4 rounded-2xl bg-gradient-to-tr from-[#2a2438] to-[#151022] border border-white/5 shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400 text-xs">rocket_launch</span>
                    </div>
                    <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="h-16 w-full bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg"></div>
                </div>
              </div>

              <div className="mt-8">
                <h1 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                  Join the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Productivity Revolution</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-md">Create your account and let AI organize your life.</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto flex items-center justify-center p-6 sm:p-12 relative z-20">
            <div className="w-full max-w-[480px] flex flex-col my-auto">
              {/* Logo & Header */}
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-2xl">bolt</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Create Account
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                    Enter your details to get started.
                </p>
              </div>

              {/* Glass Card Form */}
              <div className="glass-panel p-8 rounded-[2rem] w-full mb-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <p className="text-red-500 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="group">
                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1" htmlFor="email">Email Address</label>
                        <div className="relative flex items-center">
                        <span className="absolute left-4 text-slate-400 material-symbols-outlined pointer-events-none group-focus-within:text-primary transition-colors">mail</span>
                        <input 
                            id="email"
                            type="email" 
                            className="w-full h-14 pl-12 pr-4 bg-[#131118]/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="group">
                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1" htmlFor="password">Password</label>
                        <div className="relative flex items-center">
                        <span className="absolute left-4 text-slate-400 material-symbols-outlined pointer-events-none group-focus-within:text-primary transition-colors">lock</span>
                        <input 
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full h-14 pl-12 pr-12 bg-[#131118]/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button"
                            className="absolute right-4 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="group">
                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative flex items-center">
                        <span className="absolute left-4 text-slate-400 material-symbols-outlined pointer-events-none group-focus-within:text-primary transition-colors">lock_reset</span>
                        <input 
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full h-14 pl-12 pr-12 bg-[#131118]/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button"
                            className="absolute right-4 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                            {showConfirmPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full h-14 rounded-full bg-gradient-to-r from-[#895bf5] to-[#7042d2] text-white font-bold text-lg shadow-[0_0_20px_rgba(137,91,245,0.4)] hover:shadow-[0_0_30px_rgba(137,91,245,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : (
                        <>
                            Sign Up
                            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                        </>
                        )}
                    </button>
                    </form>

                <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-slate-700"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 h-12 rounded-full border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-slate-500 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.147-1.133 7.947-3.067 1.947-2.027 2.453-5.227 2.453-6.96 0-.613-.053-1.067-.16-1.067h-10.24z" fill="currentColor"></path>
                    </svg>
                    <span className="text-white text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 h-12 rounded-full border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-slate-500 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                    <span className="text-white text-sm font-medium">GitHub</span>
                </button>
                </div>

                <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-primary font-semibold hover:text-white transition-colors">
                    Sign In
                    </Link>
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}