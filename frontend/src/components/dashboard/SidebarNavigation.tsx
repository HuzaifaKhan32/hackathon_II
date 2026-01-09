// frontend/src/components/dashboard/SidebarNavigation.tsx
import React from 'react';
import Link from 'next/link';

interface SidebarNavigationProps {
  currentPath: string; // To highlight the active link
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ currentPath }) => {

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'grid_view', active: false },
    { name: 'All Tasks', href: '/tasks', icon: 'list_alt', active: true, count: 8 },
    { name: 'Today', href: '/today', icon: 'light_mode', active: false },
    { name: 'Upcoming', href: '/upcoming', icon: 'calendar_month', active: false },
  ];

  const intelligenceItems = [
    { name: 'AI Chat', href: '/ai-chat', icon: 'colors_spark', active: false },
    { name: 'Analytics', href: '/analytics', icon: 'query_stats', active: false },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-full relative z-20 shrink-0
                      bg-sidebar-bg border-r border-glass-border
                      light:bg-gradient-sidebar light:border-slate-200 light:shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Glass/Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none
                      bg-gradient-to-b from-primary/5 via-transparent to-transparent
                      light:opacity-50"></div>

      {/* Header / Logo */}
      <div className="px-6 py-8 flex items-center gap-3 relative z-10">
        <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-primary
                        shadow-[0_0_15px_rgba(137,91,245,0.4)]
                        light:shadow-[0_4px_15px_rgba(137,91,245,0.25)]">
          <span className="material-symbols-outlined text-white text-[24px]">smart_toy</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight leading-none
                         text-white
                         light:text-slate-900">AI Tasker</h1>
          <span className="text-xs font-medium tracking-widest uppercase mt-1 text-primary">Pro</span>
        </div>
      </div>

      {/* User Profile Widget */}
      <div className="px-6 mb-8 relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-2xl glass-card group cursor-pointer transition-colors
                        hover:bg-white/5
                        light:border light:border-slate-200 light:bg-white/50 light:hover:bg-white light:shadow-sm light:hover:shadow-md">
          <div className="relative">
            {/* Pulsing glow for light mode */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary transition-opacity blur-[2px]
                            dark:animate-pulse dark:opacity-70
                            light:opacity-0 light:group-hover:opacity-100"></div>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 relative
                            border-2 border-background-dark
                            light:border-2 light:border-white light:shadow-sm"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNGlEcxsgwYFAYMVSlbns9m6Ds6WrqbbwDusfo49GivXHL6gyoumfF_Jb3ziiKrKw80zwPovln6T0A6KTo0yxJ4kBUhJpdg0a3PMLw19gyuqtVr8ZGLKYLr7qEuXQmY3P_XH_Zxq5ReQtrm_1JCv07tHJEcrnxJmlFw_JNVTSta959YqPy8oU6XPCMOQmnK6qfCsieIdduzP6PB4MGvEHZvMaYufo8hmBwnBujiVJ54AM31BmCtQeKS81dHcxRJQz8Fa8E975uquO_1fTa9ie7VopdF4N88myh6vl-m20omCRM5ZwAFg8SoEM23643NUVakIulO")' }}
              data-alt="Portrait of Alex Designer">
            </div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full
                            border-2 border-background-dark
                            light:border-2 light:border-white"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold truncate
                          text-white
                          light:text-slate-800">Alex Designer</p>
            <p className="text-xs truncate
                          text-gray-400
                          light:text-slate-500">alex@design.ai</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 no-scrollbar relative z-10">
        <p className="px-4 text-xs font-semibold uppercase tracking-wider mb-2 mt-2
                      text-gray-500
                      light:text-slate-400">Main Menu</p>
        {navigationItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-full transition-all group overflow-hidden
                          ${isActive
                  ? 'text-white bg-gradient-primary shadow-[0_4px_20px_rgba(137,91,245,0.3)] light:shadow-[0_8px_20px_rgba(137,91,245,0.25)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100/80'
                }`}
            >
              {/* Shine Effect */}
              {isActive && (
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              )}
              <span className={`material-symbols-outlined ${isActive && 'filled'}
                               ${item.name === 'Today' ? 'dark:text-secondary light:text-slate-400 light:group-hover:text-pink-500' : ''}
                               ${item.name === 'AI Chat' ? 'dark:text-tertiary light:text-slate-400 light:group-hover:text-cyan-500' : ''}
                               ${!isActive && 'dark:group-hover:scale-110 light:group-hover:scale-110 light:text-slate-400 light:group-hover:text-primary'}`}>
                {item.icon}
              </span>
              <span className={`text-sm font-medium ${isActive && 'font-bold'}`}>
                {item.name}
              </span>
              {item.count && (
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full
                                 bg-white/20 text-white
                                 light:bg-white/25 light:text-white light:backdrop-blur-sm">{item.count}</span>
              )}
            </Link>
          );
        })}

        <p className="px-4 text-xs font-semibold uppercase tracking-wider mb-2 mt-6
                      text-gray-500
                      light:text-slate-400">Intelligence</p>
        {intelligenceItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all group
                          ${isActive
                  ? 'text-white bg-gradient-primary shadow-[0_4px_20px_rgba(137,91,245,0.3)] light:shadow-[0_8px_20px_rgba(137,91,245,0.25)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100/80'
                }`}
            >
              <span className={`material-symbols-outlined ${isActive && 'filled'}
                               ${item.name === 'AI Chat' ? 'dark:text-tertiary light:text-slate-400 light:group-hover:text-cyan-500' : ''}
                               ${item.name === 'Analytics' ? 'dark:group-hover:scale-110 light:text-slate-400 light:group-hover:text-primary light:group-hover:scale-110' : ''}
                               ${item.name === 'Dashboard' ? 'dark:group-hover:scale-110 light:text-slate-400 light:group-hover:text-primary light:group-hover:scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className={`text-sm font-medium ${isActive && 'font-bold'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Stats & Actions */}
      <div className="p-6 mt-auto flex flex-col gap-4 relative z-10">
        {/* Decorative Blur */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none
                        bg-gradient-dark-fade
                        light:bg-gradient-light-fade"></div>

        {/* Glass Stats Card */}
        <div className="glass-card rounded-2xl p-4 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl transition-colors
                          bg-primary/20 group-hover:bg-primary/30
                          light:w-24 light:h-24 light:bg-primary/10 light:group-hover:bg-primary/20"></div>
          <div className="flex justify-between items-start mb-2 relative z-10">
            <div className="p-2 rounded-lg
                            bg-white/5
                            light:bg-white light:shadow-sm light:border light:border-slate-100">
              <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full
                             text-green-400 bg-green-400/10
                             light:text-green-600 light:bg-green-100">
              +12%
            </span>
          </div>
          <div className="relative z-10
                          dark:mt-0 light:mt-2">
            <p className="text-xs mb-1
                          text-gray-400
                          light:text-slate-500 light:font-medium">Productivity Score</p>
            <p className="text-2xl font-bold
                          text-white
                          light:text-slate-800">85%</p>
          </div>
          {/* Tiny Sparkline SVG */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-12 opacity-30 light:opacity-50" preserveAspectRatio="none" viewBox="0 0 100 40">
            <path d="M0 35 Q 20 30, 40 20 T 100 5 L 100 40 L 0 40 Z" fill="url(#gradient-chart)"></path>
            <path d="M0 35 Q 20 30, 40 20 T 100 5" fill="none" stroke="#895bf5" strokeWidth="2"></path>
            <defs>
              <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#895bf5" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="transparent" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Footer Tools */}
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center gap-2 text-xs font-medium transition-colors
                             text-gray-400 hover:text-white
                             light:text-slate-400 light:hover:text-slate-800">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
