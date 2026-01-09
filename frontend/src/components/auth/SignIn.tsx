// frontend/src/components/auth/SignIn.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes'; // To detect current theme

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme(); // Get current theme

  const isDarkMode = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In Attempt:', { email, password });
    // Handle sign-in logic here
  };

  return (
    <div className="flex w-full h-full relative">
      {/* Background Gradients (Global Ambient) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none
                      bg-primary/20
                      light:bg-purple-200/40 light:mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] pointer-events-none
                      bg-secondary/10
                      light:bg-cyan-200/40 light:mix-blend-multiply"></div>

      {/* Left Panel: Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden
                      bg-[#0d0915]
                      light:bg-gradient-to-br light:from-indigo-50 light:via-white light:to-purple-50">
        {/* Decorative Background Grid */}
        <div className="absolute inset-0 opacity-20 light:opacity-[0.03]"
             style={{ backgroundImage: isDarkMode ? 'radial-gradient(#4a4458 1px, transparent 1px)' : 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        {/* Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                        bg-gradient-to-tr from-primary via-accent to-secondary opacity-30 blur-[80px]
                        light:from-primary/20 light:via-accent/20 light:to-secondary/20 light:opacity-60 light:blur-[60px]"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-lg">
          {/* 3D Floating Elements Simulation */}
          <div className="relative h-[500px] w-full">
            {/* Card 1 */}
            <div className="absolute top-10 left-0 w-64 p-5 rounded-2xl border shadow-2xl animate-float backdrop-blur-sm
                            bg-gradient-to-br from-[#2a2438] to-[#151022] border-white/10
                            light:bg-white/80 light:border-white light:shadow-xl light:shadow-indigo-100/50 light:backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center
                                bg-green-500/20
                                light:bg-green-100">
                  <span className="material-symbols-outlined text-sm
                                   text-green-400
                                   light:text-green-600">check</span>
                </div>
                <div className="h-2 w-24 rounded-full
                                bg-white/10
                                light:bg-slate-200"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full
                                bg-white/5
                                light:bg-slate-100"></div>
                <div className="h-2 w-2/3 rounded-full
                                bg-white/5
                                light:bg-slate-100"></div>
              </div>
            </div>
            {/* Card 2 (Main Focus) */}
            <div className="absolute top-32 right-0 w-72 p-6 rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float-delay z-20
                            bg-gradient-to-br from-[#362e4a] to-[#1e182d] border-primary/30
                            light:bg-white light:border-white light:shadow-[0_20px_50px_rgba(137,91,245,0.15)] light:backdrop-blur-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center
                                  bg-primary/20 text-primary
                                  light:bg-primary/10">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold
                                   text-white
                                   light:text-slate-800">AI Assistant</h3>
                    <p className="text-xs
                                  text-slate-400
                                  light:text-slate-500">Suggesting tasks...</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md text-[10px] font-mono
                                 bg-white/5 text-slate-400
                                 light:bg-slate-100 light:text-slate-500">NOW</span>
              </div>
              <div className="rounded-xl p-3 mb-3 border
                              bg-black/20 border-white/5
                              light:bg-slate-50 light:border-slate-100">
                <p className="text-sm leading-relaxed
                              text-slate-300
                              light:text-slate-600">"Based on your email, I've scheduled the meeting for 2 PM and prepared the agenda."</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg text-xs font-bold transition-colors
                                   bg-primary text-white hover:bg-primary/90
                                   light:shadow-lg light:shadow-primary/30">Approve</button>
                <button className="flex-1 py-2 rounded-lg text-xs font-bold transition-colors
                                   bg-white/5 text-slate-300 hover:bg-white/10
                                   light:bg-slate-100 light:text-slate-600 light:hover:bg-slate-200">Edit</button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="absolute bottom-20 left-10 w-56 p-4 rounded-2xl border shadow-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center
                                bg-blue-500/20
                                light:bg-blue-100">
                  <span className="material-symbols-outlined text-xs
                                   text-blue-400
                                   light:text-blue-600">calendar_today</span>
                </div>
                <div className="h-2 w-20 rounded-full
                                bg-white/10
                                light:bg-slate-200"></div>
              </div>
              <div className="h-16 w-full rounded-lg
                              bg-gradient-to-r from-blue-500/10 to-transparent
                              light:bg-gradient-to-r light:from-blue-50 light:to-transparent light:border light:border-blue-50/50"></div>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-5xl font-bold mb-4 tracking-tight leading-tight
                           text-white
                           light:text-slate-900">
              Organize chaos <br />
              <span className="text-transparent bg-clip-text
                               bg-gradient-to-r from-primary to-secondary
                               light:from-primary light:to-secondary">with AI Intelligence</span>
            </h1>
            <p className="text-lg max-w-md
                          text-slate-400
                          light:text-slate-500">Experience the future of productivity. Let our AI handle the noise while you focus on what matters.</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-20">
        <div className="w-full max-w-[480px] flex flex-col">
          {/* Logo & Header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg
                            shadow-primary/20
                            light:shadow-primary/30">
              <span className="material-symbols-outlined text-white text-2xl">bolt</span>
            </div>
            <h2 className="text-3xl font-bold mb-2
                           text-white
                           light:text-slate-900">Welcome Back</h2>
            <p className="text-base
                          text-slate-400
                          light:text-slate-500">Enter your details to access your workspace.</p>
          </div>

          {/* Glass Card Form */}
          <div className="glass-panel p-8 rounded-[2rem] w-full">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium mb-2 ml-1
                                                 text-slate-300
                                                 light:text-slate-700">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 material-symbols-outlined pointer-events-none group-focus-within:text-primary transition-colors
                                   text-slate-400">mail</span>
                  <input
                    id="email"
                    className="w-full h-14 pl-12 pr-4 rounded-full text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300
                               bg-[#131118]/50 border border-slate-700 text-white placeholder-slate-500
                               light:bg-white light:border light:border-slate-200 light:text-slate-900 light:placeholder-slate-400 light:shadow-sm"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium mb-2 ml-1
                                                    text-slate-300
                                                    light:text-slate-700">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 material-symbols-outlined pointer-events-none group-focus-within:text-primary transition-colors
                                   text-slate-400">lock</span>
                  <input
                    id="password"
                    className="w-full h-14 pl-12 pr-12 rounded-full text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-1 focus:ring-primary transition-all duration-300
                               bg-[#131118]/50 border border-slate-700 text-white placeholder-slate-500
                               light:bg-white light:border light:border-slate-200 light:text-slate-900 light:placeholder-slate-400 light:shadow-sm"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 flex items-center justify-center transition-colors
                               text-slate-400 hover:text-white
                               light:hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
                <div className="flex justify-end mt-2 mr-1">
                  <Link href="#" className="text-sm transition-colors
                                            text-slate-400 hover:text-primary
                                            light:text-slate-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full h-14 rounded-full bg-gradient-to-r from-primary to-[#7042d2] text-white font-bold text-lg shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2
                           shadow-[0_0_20px_rgba(137,91,245,0.4)] hover:shadow-[0_0_30px_rgba(137,91,245,0.6)]
                           light:shadow-primary/30 light:hover:shadow-xl light:hover:shadow-primary/40"
              >
                Sign In
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-8 items-center">
              <div className="flex-grow border-t
                              border-slate-700
                              light:border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-sm
                               text-slate-500
                               light:text-slate-400">Or continue with</span>
              <div className="flex-grow border-t
                              border-slate-700
                              light:border-slate-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 h-12 rounded-full border transition-all duration-300 group
                                 border-slate-700 bg-white/5 hover:bg-white/10 hover:border-slate-500
                                 light:border-slate-200 light:bg-white light:hover:bg-slate-50 light:hover:border-slate-300 light:shadow-sm">
                {/* Google SVG Icon */}
                <svg aria-hidden="true" className="w-5 h-5 group-hover:scale-110 transition-transform
                                  text-white
                                  light:text-slate-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.147-1.133 7.947-3.067 1.947-2.027 2.453-5.227 2.453-6.96 0-.613-.053-1.067-.16-1.067h-10.24z" fill="currentColor"></path>
                </svg>
                <span className="text-sm font-medium
                                 text-white
                                 light:text-slate-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 h-12 rounded-full border transition-all duration-300 group
                                 border-slate-700 bg-white/5 hover:bg-white/10 hover:border-slate-500
                                 light:border-slate-200 light:bg-white light:hover:bg-slate-50 light:hover:border-slate-300 light:shadow-sm">
                {/* Github SVG Icon */}
                <svg aria-hidden="true" className="w-5 h-5 group-hover:scale-110 transition-transform
                                  text-white
                                  light:text-slate-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium
                                 text-white
                                 light:text-slate-700">GitHub</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm
                            text-slate-400
                            light:text-slate-500">
                Don't have an account?{' '}
                <Link href="#" className="font-semibold transition-colors
                                          text-primary hover:text-white
                                          light:hover:text-primary/80">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
