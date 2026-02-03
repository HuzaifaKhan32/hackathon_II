import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import LogoutModal from '@/components/modals/LogoutModal';
import Image from 'next/image';

interface SidebarProps {
  onChatToggle?: () => void;
  isChatOpen?: boolean;
}

export default function Sidebar({ onChatToggle, isChatOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[280px] h-full bg-[#15121e] border-r border-[#2d2839] relative z-20 shrink-0 overflow-hidden">
        {/* Glass/Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Scrollable Container */}
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Header / Logo */}
          <div className="px-6 py-8 flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#895bf5] to-[#a27bfc] shadow-[0_0_15px_rgba(137,91,245,0.4)]">
              <span className="material-symbols-outlined text-white text-[24px]">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">AI Tasker</h1>
              <span className="text-xs text-primary font-medium tracking-widest uppercase mt-1">Pro</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 px-4 shrink-0">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">Main Menu</p>
            
            {/* Dashboard (Active) */}
            <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all group ${isActive('/dashboard') ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">grid_view</span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            {/* All Tasks */}
            <Link href="/dashboard/tasks" className={`relative flex items-center gap-3 px-4 py-3 rounded-full transition-all overflow-hidden group ${isActive('/dashboard/tasks') ? 'text-white bg-gradient-to-br from-[#895bf5] to-[#a27bfc] shadow-[0_4px_20px_rgba(137,91,245,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              {/* Shine Effect - Only show when active */}
              {isActive('/dashboard/tasks') && <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>}
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>list_alt</span>
              <span className="text-sm font-bold">All Tasks</span>
            </Link>

            {/* Today */}
            <Link href="/dashboard/today" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all group ${isActive('/dashboard/today') ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className={`material-symbols-outlined transition-colors ${isActive('/dashboard/today') ? 'text-accent-pink' : 'text-accent-pink group-hover:text-pink-400'}`}>light_mode</span>
              <span className="text-sm font-medium">Today</span>
            </Link>

            {/* Upcoming */}
            <Link href="/dashboard/upcoming" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all group ${isActive('/dashboard/upcoming') ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">calendar_month</span>
              <span className="text-sm font-medium">Upcoming</span>
            </Link>

            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">Intelligence</p>
            
            {/* AI Chat */}
            <button onClick={onChatToggle} className={`flex w-full items-center gap-3 px-4 py-3 rounded-full transition-all group ${isChatOpen ? 'text-cyan-300 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className={`material-symbols-outlined text-accent-cyan group-hover:text-cyan-300 transition-colors ${isChatOpen ? 'text-cyan-300' : ''}`}>colors_spark</span>
              <span className="text-sm font-medium">AI Chat</span>
            </button>

            {/* Analytics (Placeholder) */}
            <Link href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">query_stats</span>
              <span className="text-sm font-medium">Analytics</span>
            </Link>
          </div>

          {/* Bottom Spacer to push stats down when content is short */}
          <div className="flex-grow min-h-[20px]"></div>

          {/* Bottom Stats & Actions */}
          <div className="p-6 mt-auto flex flex-col gap-4 relative shrink-0">
            {/* Decorative Blur */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#15121e] to-transparent pointer-events-none"></div>
            
            {/* User Profile Widget */}
            <div className="group relative flex items-center justify-between p-3 rounded-2xl glass-card border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent-cyan animate-pulse opacity-70"></div>
                  <div className="flex items-center justify-center rounded-full size-10 relative border-2 border-[#0f0f13] bg-gray-700 text-white font-bold text-lg overflow-hidden">
                    {user?.image ? (
                        <Image src={user.image} alt={user.name || 'User'} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                        <span>{user?.email?.[0].toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#0f0f13] rounded-full"></div>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <p className="text-sm font-bold text-white truncate max-w-[120px]">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[120px]">{user?.email || 'Loading...'}</p>
                </div>
              </div>

              {/* Logout Gate Button */}
              <button 
                onClick={() => setIsLogoutModalOpen(true)}
                className="shrink-0 flex items-center justify-center size-8 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
            
            {/* Theme Toggles */}
            <div className="flex items-center justify-center gap-2 mt-1">
               <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/5 w-full justify-center">
                <button className="flex-1 py-1 rounded-full bg-white/10 flex items-center justify-center text-white shadow-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                </button>
                <button className="flex-1 py-1 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px]">light_mode</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </aside>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          logout();
        }} 
      />
    </>
  );
}
