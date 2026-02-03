// frontend/src/components/landing-page/LandingPageHero.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingPageHero: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col min-h-screen">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Stripes */}
        <div className="absolute inset-0 bg-stripes opacity-30"></div>
        {/* Gradient Orbs/Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob
                        bg-primary/30
                        light:bg-purple-200 light:mix-blend-multiply light:blur-[80px] light:opacity-60"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000
                        bg-blue-500/20
                        light:bg-cyan-200 light:mix-blend-multiply light:blur-[100px] light:opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000
                        bg-purple-600/20
                        light:bg-pink-200 light:mix-blend-multiply light:blur-[100px] light:opacity-50"></div>
        {/* Particles */}
        <div className="particle w-1 h-1 top-[15%] left-[10%] animate-pulse dark:bg-white light:bg-purple-500"></div>
        <div className="particle w-2 h-2 top-[35%] right-[20%] animate-pulse-slow dark:bg-cyan-400 light:bg-cyan-500 blur-[1px]"></div>
        <div className="particle w-1.5 h-1.5 bottom-[25%] left-[30%] animate-pulse dark:bg-pink-400 light:bg-pink-500 blur-[1px]"></div>
      </div>

      {/* Hero Section Main Content */}
      <main className="flex-grow flex items-center justify-center relative px-6 py-12 lg:py-0">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
            {/* Meta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg transition-all cursor-default
                            glass-panel border-white/10 shadow-primary/5 hover:shadow-primary/20
                            light:border-white/60 light:shadow-slate-200/50 light:hover:shadow-md light:font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 light:bg-green-500"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs tracking-wide uppercase
                               dark:font-medium text-gray-300
                               light:font-bold light:text-slate-600">v2.0 AI Engine Live</span>
            </div>
            {/* Headings */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-white light:text-slate-900">Evolution of</span>
                <span className="block gradient-text-heading pb-2">Todo Management</span>
              </h1>
              <p className="text-lg md:text-xl max-w-[600px] lg:max-w-none leading-relaxed
                            text-gray-400
                            light:text-slate-600 light:font-medium">
                AI-Powered task management that never sleeps. Experience the future of productivity with a chatbot that anticipates your needs before you do.
              </p>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Link href="#" className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full text-white font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto
                                         gradient-button-primary shadow-primary/40 hover:shadow-primary/60
                                         light:shadow-primary/30 light:hover:shadow-primary/50">
                <span>Get Started</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link href="#" className="flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-base transition-all duration-300 w-full sm:w-auto hover:-translate-y-1
                                         glass-button-secondary text-cyan-50">
                <span className="material-symbols-outlined text-cyan-400 light:text-cyan-500">play_circle</span>
                <span>Watch Demo</span>
              </Link>
            </div>
            {/* Trust Elements / Social Proof */}
            <div className="pt-8 flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest
                            text-gray-500
                            light:font-bold light:text-slate-400">Trusted by teams at</p>
              <div className="flex items-center gap-6 opacity-40 grayscale">
                {/* Simple CSS shapes/text to represent logos without images */}
                <span className="text-lg font-bold font-sans tracking-tight text-white light:text-slate-800">ACME</span>
                <span className="text-lg font-black font-serif italic text-white light:text-slate-800">Globex</span>
                <div className="flex items-center gap-1"><div className="size-4 rounded-full bg-white light:bg-slate-800"></div><span className="font-bold text-white light:text-slate-800">Soylent</span></div>
              </div>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative flex justify-center lg:justify-end items-center h-[500px] lg:h-[700px] w-full perspective-1000">
            {/* Abstract Background Behind Image */}
            <div className="absolute inset-0 rounded-full filter blur-[80px] animate-pulse-slow
                            bg-gradient-to-tr from-primary/20 to-cyan-500/20
                            light:from-purple-200/50 light:to-cyan-200/50 light:blur-[60px]"></div>
            {/* Main 3D Floating Illustration */}
            <div className="relative w-full max-w-[500px] aspect-square animate-float z-10">
              {/* Outer Card (rotated) */}
              <div className="absolute inset-0 rounded-3xl backdrop-blur-sm border transform rotate-6 shadow-2xl
                              bg-gradient-to-br from-white/10 to-white/0 border-white/20
                              light:from-white/40 light:to-white/10 light:border-white/60 light:shadow-purple-500/5"></div>
              {/* Inner Card (rotated) */}
              <div className="absolute inset-0 rounded-3xl transform -rotate-3 border overflow-hidden shadow-2xl flex flex-col
                              bg-[#131118]/80 border-white/10
                              light:bg-white/90 light:border-white/80 light:shadow-slate-400/20">
                {/* Fake Chat UI Header */}
                <div className="p-4 border-b flex items-center gap-3
                                border-white/10 bg-white/5
                                light:border-slate-100 light:bg-slate-50/50">
                  <div className="size-3 rounded-full bg-red-500 light:bg-red-400"></div>
                  <div className="size-3 rounded-full bg-yellow-500 light:bg-yellow-400"></div>
                  <div className="size-3 rounded-full bg-green-500 light:bg-green-400"></div>
                  <div className="ml-auto text-xs
                                  text-gray-400
                                  light:text-slate-400 light:font-semibold">AI Assistant</div>
                </div>
                {/* Fake Chat UI Bubbles */}
                <div className="p-6 space-y-4 flex-1 overflow-hidden relative">
                  <div className="flex gap-3">
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex-shrink-0"></div>
                    <div className="p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]
                                    bg-white/10 text-gray-200
                                    light:bg-slate-100 light:text-slate-700 light:font-medium">
                      Analyzing your schedule for next week...
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex-shrink-0 animate-pulse"></div>
                    <div className="p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]
                                    bg-white/10 text-gray-200
                                    light:bg-slate-100 light:text-slate-700 light:font-medium">
                      I found 3 conflicts. Should I reschedule your &quot;Product Sync&quot;?
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end mt-4">
                    <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%] shadow-lg shadow-primary/20 light:font-medium">
                      Yes, move it to Friday afternoon.
                    </div>
                  </div>
                  {/* Floating 3D Elements over UI */}
                  <Image
                    className="absolute -bottom-10 -right-10 w-48 h-48 object-cover rounded-full shadow-2xl animate-float-delayed
                               border-4 border-[#151022]
                               light:border-[6px] light:border-white"
                    data-alt="Abstract 3D glass shape representing AI processing"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw_N8W2SeFkrUT2k72dfO1KtjwszYGFEZ4IRIonCYMly-dxeSecu1BSqma7FH9rsdqlI24_VOec0QqcMK8bX9Irp-m8q2WB_hzXlOS-PByQeybiFrDRPMMo7i7sgGprNrkTItojp99xBdqxmMXwLMdIftK-BCtR-s0ZFim1Lg7tXgeK2VUvU7ef52QZduQaLKp8spfkKvYkz-rpI0YZx8uIkyf7AdTk0PLrmet1E64BwMciRQ7MgI0xovZwXlRtT1cjjFO5R9HJtMl"
                    alt="Abstract 3D glass shape representing AI processing"
                    width={192} // original width: 192px (48*4)
                    height={192} // original height: 192px (48*4)
                  />
                </div>
              </div>
            </div>
            {/* Decorative Floating Elements */}
            <div className="absolute top-[10%] left-[10%] p-3 rounded-2xl animate-float-delayed flex items-center gap-2 shadow-xl
                            glass-panel
                            light:shadow-slate-200/50">
              <span className="material-symbols-outlined text-green-400 light:text-green-500">check_circle</span>
              <span className="text-sm font-bold text-white light:text-slate-800">Task Complete</span>
            </div>
            <div className="absolute bottom-[20%] right-[-5%] lg:right-[10%] p-3 rounded-2xl animate-float flex items-center gap-2 shadow-xl z-20
                            glass-panel
                            light:shadow-slate-200/50">
              <span className="material-symbols-outlined text-yellow-400 light:text-yellow-500">bolt</span>
              <span className="text-sm font-bold text-white light:text-slate-800">Efficiency +240%</span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default LandingPageHero;
