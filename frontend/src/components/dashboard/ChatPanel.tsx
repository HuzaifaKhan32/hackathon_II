"use client";

import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, deleteChatHistory, ChatMessage } from '@/lib/chat';
import { Send, Bot, User, X, Trash2 } from 'lucide-react';

interface ChatPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await sendChatMessage(userMessage.content, conversationId);

      if (!conversationId) {
        setConversationId(response.conversation_id);
      }

      const modelMessage: ChatMessage = { role: 'model', content: response.message };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    if (confirm("Are you sure you want to delete all chat history?")) {
        try {
            await deleteChatHistory();
            setMessages([]);
            setConversationId(undefined);
        } catch (error) {
            console.error("Failed to delete history", error);
            alert("Failed to delete history. Please try again.");
        }
    }
  };

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
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-white/10 text-primary">
                 <Bot className="w-6 h-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#131118] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-base font-bold leading-tight tracking-tight">AI Assistant</h2>
              <span className="text-primary text-xs font-medium tracking-wide">Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleDeleteHistory}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[#a59cba] hover:text-red-500 transition-colors"
              title="Clear History"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[#a59cba] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 relative z-10 scroll-smooth custom-scrollbar" ref={scrollRef}>
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-[#a59cba] uppercase tracking-widest border border-white/5">Today</span>
        </div>

        {messages.length === 0 && (
           <div className="text-center text-muted-foreground mt-10 opacity-70">
             <p className="text-[#a59cba]">Hi! I can help you manage your tasks.</p>
             <p className="text-xs mt-2 text-[#a59cba]">Try saying &quot;Add a task to buy milk&quot;</p>
           </div>
        )}

        {messages.map((msg, idx) => (
           <div key={idx} className={`flex items-end gap-3 group ${msg.role === 'user' ? 'justify-end' : ''}`}>
             {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 ring-1 ring-white/10 text-primary">
                    <Bot className="w-5 h-5" />
                </div>
             )}
             
             <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl text-white text-sm font-sans leading-relaxed shadow-lg backdrop-blur-sm 
                    ${msg.role === 'model' ? 'ai-bubble-gradient rounded-bl-none' : 'user-bubble-gradient rounded-br-none'}`}>
                  {msg.content}
                </div>
             </div>

             {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 ring-1 ring-white/10 text-white">
                    <User className="w-5 h-5" />
                </div>
             )}
           </div>
        ))}

        {/* AI Typing Indicator */}
        {isLoading && (
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 ring-1 ring-white/10 text-primary">
                  <Bot className="w-5 h-5" />
              </div>
              <div className="ai-bubble-gradient px-4 py-3 rounded-2xl rounded-bl-none shadow-lg backdrop-blur-sm flex items-center gap-1 h-10 w-16">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
        )}
        
        {/* Spacer for scrolling */}
        <div className="h-2"></div>
      </div>

      {/* Composer / Input Area */}
      <div className="p-4 pt-2 relative z-20">
        {/* Glassmorphism Container for Input */}
        <div className="relative w-full group">
          {/* Glow effect on focus */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
          <div className="relative flex items-end gap-2 bg-[#1c1924]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 pr-2 shadow-2xl">
            <div className="flex-1 flex items-center min-h-[48px]">
              <textarea 
                ref={textareaRef}
                className="w-full bg-transparent border-none text-white text-sm font-sans placeholder-[#a59cba] focus:ring-0 resize-none py-3 pl-4 max-h-32 focus:outline-none" 
                placeholder="Ask AI to manage tasks..." 
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                disabled={isLoading}
              ></textarea>
            </div>
            <div className="flex items-center pb-1 gap-1">
              {/* Send Button */}
              <button 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#895bf5] to-[#6c42ca] text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ml-1 disabled:opacity-50"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-5 h-5 ml-0.5" />
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