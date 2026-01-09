"use client";

import Image from 'next/image';

interface ChatPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-full lg:w-[400px] xl:w-[25%] flex flex-col h-full bg-[#131118] border-l border-[#2d2839] relative z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-subtle-grid-dark pointer-events-none opacity-50"></div>
      
      {/* Header */}
      <div className="relative z-20 flex flex-col flex-shrink-0">
        {/* Top Gradient Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2d2839] bg-[#131118]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-white/10" data-alt="AI Robot Avatar face" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA43NjFAsvt0uyZifeeyNPLzDMCAI6BSwIqT_JqQKoW_KtlGvqW0K3OmHjGOlgnEP3IedxeUKlLQCCBLHOMleoem2n8d7P8FlPhe5CxcuHd-r5avDpzwGmqbdvVOgeGV9a1P8bUJjJFTWsF2KxLrDabrK_QoHz9gywgrk_04m78_0PGVjzp5QOEWZF3JZoCmod4gAWrmSOFW65M4C-X66JWPmDeoP_G5xA2W9CIfpYX_62csFInohhXz8b4lAKeryOKs9wQsTfBMiAt")' }}></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#131118] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-base font-bold leading-tight tracking-tight">AI Assistant</h2>
              <span className="text-primary text-xs font-medium tracking-wide">Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[#a59cba] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[#a59cba] transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 relative z-10 scroll-smooth custom-scrollbar">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-[#a59cba] uppercase tracking-widest border border-white/5">Today</span>
        </div>

        {/* AI Message 1 */}
        <div className="flex items-end gap-3 group">
          <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 ring-1 ring-white/10" data-alt="AI Robot Avatar face" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIagFHoMZchyzaikWhMkWLvlL0H7TnJu0MqBq2gBC2wkoDGDB2gn6LLOLohdqA6mJ2_EcWtAVahzj1hYnlDREy8JqaS2L0rPRk9nVAJqnf0-7d71GZsFQ-FmW3X7yE9sOMDHlEy1vynk3iKzlKmSM4DbaF-kGRpAOYa428mkVsZ4fQ_E1WcPLi68i-kMOitywZpHlF7UeIUUW6_je201UZgcSYcbJBFpWyuefM_gRKIne894aIzWorZBAtW-DTrQX8dEP2Y_MuH_dX")' }}></div>
          <div className="flex flex-col gap-1 max-w-[85%]">
            <div className="ai-bubble-gradient p-4 rounded-2xl rounded-bl-none text-white text-sm font-sans leading-relaxed shadow-lg backdrop-blur-sm">
              Hello! I noticed you have <span className="text-primary font-bold">3 overdue tasks</span> from the &quot;Q3 Marketing&quot; project. Should we reschedule them?
            </div>
            <span className="text-[#a59cba] text-[10px] pl-1 opacity-0 group-hover:opacity-100 transition-opacity">10:42 AM</span>
          </div>
        </div>

        {/* User Message */}
        <div className="flex items-end gap-3 justify-end group">
          <div className="flex flex-col gap-1 items-end max-w-[85%]">
            <div className="user-bubble-gradient p-4 rounded-2xl rounded-br-none text-white text-sm font-sans leading-relaxed shadow-lg">
              Yes, please move them to tomorrow morning.
            </div>
            <span className="text-[#a59cba] text-[10px] pr-1 opacity-0 group-hover:opacity-100 transition-opacity text-right">10:43 AM</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 ring-1 ring-white/10" data-alt="User profile photo woman" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_mB3Xsd3kKf3aHOU8g4OYZOEiDWSHEud6tlA_ZFGVLHrMMubVOIEJ-VGhL4ETfIhjpZm2KyY0CKbd46sU4Uv2BEFlTPv6POeczu3fYEIit5mcpw8h0OuqWFC85_z-I99ImQl_1k6YB4lCAdhWPfpB4MGvEHZvMaYufo8hmBwnBujiVJ54AM31BmCtQeKS81dHcxRJQz8Fa8E975uquO_1fTa9ie7VopdF4N88myh6vl-m20omCRM5ZwAFg8SoEM23643NUVakIulO")' }}></div>
        </div>

        {/* AI Message 2 */}
        <div className="flex items-end gap-3 group">
          <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 ring-1 ring-white/10" data-alt="AI Robot Avatar face" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzOWG6H2QIoXywGGz9cJvlUAM-ERHontgHhN3Gj5DCo23mjMqFIj2cIOPthgt4nsVwKNI232grVJ4P3dqu2SoDyYv_zKfAr1xJgY8KggLT_hqZtBUVyKgTrU22v3YWMoSx8vF6e2EsXe0Ggx6u3zOKO65hA5BVZKj6-mqn9w6YD1tbCtbd2RzlyMGNJQviw-qb8zv2E0b1rDDbWKywccze-VAi6gHoBKpnVvnVMQLUY3SReFdLkQrmfw5s0vza7P9hYh4ubqgcwTOF")' }}></div>
          <div className="flex flex-col gap-1 max-w-[85%]">
            <div className="ai-bubble-gradient p-4 rounded-2xl rounded-bl-none text-white text-sm font-sans leading-relaxed shadow-lg backdrop-blur-sm">
              Done. I&apos;ve updated your schedule. Would you like me to send a notification to the team?
            </div>
            <span className="text-[#a59cba] text-[10px] pl-1 opacity-0 group-hover:opacity-100 transition-opacity">10:43 AM</span>
          </div>
        </div>

        {/* AI Typing Indicator */}
        <div className="flex items-end gap-3">
          <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 ring-1 ring-white/10" data-alt="AI Robot Avatar face" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALqgLTaJDoGaHOuMfhfeF56lfLz502HYc8e3xFtRVclAXiEBsiNzCsg_8FYKSPyP20nzfTwqbCXWptfqfcPCCKLfB0v-nzII3ABXSFUQ8JBKrObYCyL7FlvgXBlNAVO8aXtu2pDRKpW3Yfk0-mcX6lbfyexG_BTYoYCW89JAZ5tpwDjP6JK2tb4XmndhE1mFpL8n2wA8ye8HBRp6RhnSZ0ImxHYEuAAPVmBV5kMIMl_SxCczM9dCuPNQahTNhfN2j7CWKSmZ-oivA_")' }}></div>
          <div className="ai-bubble-gradient px-4 py-3 rounded-2xl rounded-bl-none shadow-lg backdrop-blur-sm flex items-center gap-1 h-10 w-16">
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
        
        {/* Spacer for scrolling */}
        <div className="h-2"></div>
      </div>

      {/* Composer / Input Area */}
      <div className="p-4 pt-2 relative z-20">
        {/* Glassmorphism Container for Input */}
        <div className="relative w-full group">
          {/* Glow effect on focus (simulated with absolute div) */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
          <div className="relative flex items-end gap-2 bg-[#1c1924]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 pr-2 shadow-2xl">
            <div className="flex-1 flex items-center min-h-[48px]">
              <textarea 
                className="w-full bg-transparent border-none text-white text-sm font-sans placeholder-[#a59cba] focus:ring-0 resize-none py-3 pl-4 max-h-32 focus:outline-none" 
                placeholder="Ask AI to manage tasks..." 
                rows={1}
              ></textarea>
            </div>
            <div className="flex items-center pb-1 gap-1">
              {/* Attachment Button */}
              <button className="p-2 rounded-full text-[#a59cba] hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              {/* Voice Button */}
              <button className="p-2 rounded-full text-[#a59cba] hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              {/* Send Button */}
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#895bf5] to-[#6c42ca] text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ml-1">
                <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-[#a59cba]/60">AI can make mistakes. Please verify important info.</p>
        </div>
      </div>
    </div>
  );
}