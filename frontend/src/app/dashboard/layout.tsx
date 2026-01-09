"use client";

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatPanel from '@/components/dashboard/ChatPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f0f12] text-white">
      {/* Sidebar - Persistent */}
      <Sidebar 
        onChatToggle={() => setIsChatOpen(!isChatOpen)} 
        isChatOpen={isChatOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex h-full overflow-hidden relative">
        {/* Main Page Content */}
        <main className="flex-1 h-full overflow-y-auto relative z-10 custom-scrollbar">
          {children}
        </main>

        {/* Chat Panel - Conditionally Rendered or Hidden on mobile */}
        {/* It sits on the right side of the main content in this layout */}
        {isChatOpen && (
          <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        )}
      </div>
    </div>
  );
}