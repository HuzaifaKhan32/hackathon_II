"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  onChatToggle?: () => void;
  isChatOpen?: boolean;
}

export default function Sidebar({ onChatToggle, isChatOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-full bg-[#15121e] border-r border-[#2d2839] relative z-20 shrink-0">
      {/* Glass/Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Header / Logo */}
      <div className="px-6 py-8 flex items-center gap-3">
        <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#895bf5] to-[#a27bfc] shadow-[0_0_15px_rgba(137,91,245,0.4)]">
          <span className="material-symbols-outlined text-white text-[24px]">smart_toy</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">AI Tasker</h1>
          <span className="text-xs text-primary font-medium tracking-widest uppercase mt-1">Pro</span>
        </div>
      </div>

      {/* User Profile Widget */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-3 rounded-2xl glass-card group cursor-pointer hover:bg-white/5 transition-colors border border-white/10 bg-white/5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent-cyan animate-pulse opacity-70"></div>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 relative border-2 border-[#0f0f13]" data-alt="Portrait of Alex Designer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNGlEcxsgwYFAYMVSlbns9m6Ds6WrqbbwDusfo49GivXHL6gyoumfF_Jb3ziiKrKw80zwPovln6T0A6KTo0yxJ4kBUhJpdg0a3PMLw19gyuqtVr8ZGLKYLr7qEuXQmY3P_XH_Zxq5ReQtrm_1JCv07tHJEcrnxJmlFw_JNVTSta959YqPy8oU6XPCMOQmnK6qfCsieIdduzP6OzKo1Y0k1mnt7Bu7_7SGs6Xs7Eref0GxUzxYn29sT2KVQkszvpPG5_SsRVzlyuXN9")' }}></div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#0f0f13] rounded-full"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Alex Designer</p>
            <p className="text-xs text-gray-400 truncate">alex@design.ai</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 no-scrollbar">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">Main Menu</p>
        
        {/* Dashboard (Inactive) */}
        <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all group ${isActive('/dashboard') && !pathname.includes('tasks') ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">grid_view</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        {/* All Tasks (Active - Purple) */}
        <Link href="/dashboard/tasks" className="relative flex items-center gap-3 px-4 py-3 rounded-full text-white bg-gradient-to-br from-[#895bf5] to-[#a27bfc] shadow-[0_4px_20px_rgba(137,91,245,0.3)] transition-all overflow-hidden group">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>list_alt</span>
          <span className="text-sm font-bold">All Tasks</span>
          <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
        </Link>

        {/* Today (Inactive with Pink Accent Hover) */}
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
          <span className="material-symbols-outlined text-accent-pink group-hover:text-pink-400 transition-colors">light_mode</span>
          <span className="text-sm font-medium">Today</span>
        </Link>

        {/* Upcoming */}
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">calendar_month</span>
          <span className="text-sm font-medium">Upcoming</span>
        </Link>

        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">Intelligence</p>
        
        {/* AI Chat (Inactive with Cyan Accent Hover) - Triggers Chat Panel */}
        <button onClick={onChatToggle} className={`flex w-full items-center gap-3 px-4 py-3 rounded-full transition-all group ${isChatOpen ? 'text-cyan-300 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <span className={`material-symbols-outlined text-accent-cyan group-hover:text-cyan-300 transition-colors ${isChatOpen ? 'text-cyan-300' : ''}`}>colors_spark</span>
          <span className="text-sm font-medium">AI Chat</span>
        </button>

        {/* Analytics */}
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">query_stats</span>
          <span className="text-sm font-medium">Analytics</span>
        </Link>
      </div>

      {/* Bottom Stats & Actions */}
      <div className="p-6 mt-auto flex flex-col gap-4 relative">
        {/* Decorative Blur */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#15121e] to-transparent pointer-events-none"></div>
        
        {/* Glass Stats Card */}
        <div className="rounded-2xl p-4 relative overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-2 relative z-10">
            <div className="p-2 bg-white/5 rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 text-xs mb-1">Productivity Score</p>
            <p className="text-2xl font-bold text-white">85%</p>
          </div>
          {/* Tiny Sparkline SVG */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-12 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#895bf5"></stop>
                <stop offset="100%" stopColor="transparent"></stop>
              </linearGradient>
            </defs>
            <path d="M0 35 Q 20 30, 40 20 T 100 5 L 100 40 L 0 40 Z" fill="url(#gradient-chart)"></path>
            <path d="M0 35 Q 20 30, 40 20 T 100 5" fill="none" stroke="#895bf5" strokeWidth="2"></path>
          </svg>
        </div>

        {/* Footer Tools */}
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </button>
          <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/5">
            <button className="size-6 rounded-full bg-white/10 flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[14px]">dark_mode</span>
            </button>
            <button className="size-6 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[14px]">light_mode</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}