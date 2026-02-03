"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import ChatPanel from '@/components/dashboard/ChatPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center bg-[#0f0f12] text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

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
