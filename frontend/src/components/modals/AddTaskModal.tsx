"use client";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* MODAL CONTAINER */}
      {/* Using a gradient ring wrapper for the border effect */}
      <div className="group relative w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
        {/* Glow Effect behind */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-600 to-accent-pink rounded-[2.2rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-1000"></div>
        {/* Main Card */}
        <div className="relative flex flex-col w-full bg-[#131118]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined filled">add_task</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#a59cba]">Create New Task</span>
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 text-[#a59cba] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          {/* SCROLLABLE BODY */}
          <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
            {/* TASK TITLE */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#a59cba] ml-1">Task Title</label>
              <div className="relative group/input">
                <input 
                  className="w-full bg-[#1e1a29] text-white placeholder-[#585366] text-lg px-6 py-4 rounded-2xl border border-[#2d2839] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-inner" 
                  placeholder="What needs to be done?" 
                  type="text" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </div>
              </div>
            </div>
            
            {/* META ROW (Date & Priority) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#a59cba] ml-1">Due Date</label>
                <div className="relative">
                  <button className="flex items-center w-full bg-[#1e1a29] hover:bg-[#252033] text-white px-5 py-3.5 rounded-xl border border-[#2d2839] transition-colors text-left group">
                    <span className="material-symbols-outlined text-[#a59cba] mr-3 group-hover:text-primary transition-colors">calendar_today</span>
                    <span className="text-base">Tomorrow, 10:00 AM</span>
                    <span className="material-symbols-outlined text-[#a59cba] ml-auto text-sm">expand_more</span>
                  </button>
                </div>
              </div>
              {/* Priority Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#a59cba] ml-1">Priority</label>
                <div className="flex bg-[#1e1a29] p-1.5 rounded-xl border border-[#2d2839]">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#a59cba] hover:text-white hover:bg-white/5 transition-all">
                    Low
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#a59cba] hover:text-white hover:bg-white/5 transition-all">
                    Medium
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-red-500 shadow-lg shadow-orange-900/20 transition-all">
                    <span className="material-symbols-outlined text-[18px] filled">flag</span>
                    High
                  </button>
                </div>
              </div>
            </div>
            
            {/* DESCRIPTION */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="block text-sm font-medium text-[#a59cba] ml-1">Description</label>
                <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light transition-colors px-2 py-1 rounded-full hover:bg-primary/10">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  AI Generate
                </button>
              </div>
              <textarea 
                className="w-full bg-[#1e1a29] text-white placeholder-[#585366] text-base px-6 py-4 rounded-2xl border border-[#2d2839] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none transition-all" 
                placeholder="Add details, subtasks, or paste links..." 
                rows={4}
              ></textarea>
            </div>
            
            {/* TAGS & TOGGLES */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
              {/* Tags Input */}
              <div className="flex-1 space-y-3">
                <label className="block text-sm font-medium text-[#a59cba] ml-1">Tags</label>
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border border-[#2d2839] bg-[#1e1a29] min-h-[56px]">
                  {/* Tag 1 */}
                  <div className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                    <span>Product</span>
                    <button className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                  </div>
                  {/* Tag 2 */}
                  <div className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                    <span>Urgent</span>
                    <button className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                  </div>
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-[#585366] min-w-[80px] p-0 ml-1 focus:outline-none" 
                    placeholder="+ Add tag" 
                    type="text"
                  />
                </div>
              </div>
              {/* Options */}
              <div className="md:w-auto w-full space-y-3">
                <label className="block text-sm font-medium text-[#a59cba] ml-1 md:text-right">Options</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-[#2d2839] group-hover:bg-[#383247]">
                      <span className="translate-x-6 inline-block w-4 h-4 transform bg-primary rounded-full transition-transform"></span>
                    </div>
                    <span className="text-sm text-white group-hover:text-white/80">Remind me</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-[#2d2839] group-hover:bg-[#383247]">
                      <span className="translate-x-1 inline-block w-4 h-4 transform bg-[#a59cba] rounded-full transition-transform"></span>
                    </div>
                    <span className="text-sm text-[#a59cba] group-hover:text-white/80">Recurring</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* FOOTER */}
          <div className="flex items-center justify-end gap-4 px-8 py-6 bg-[#1e1a29]/50 border-t border-white/5 backdrop-blur-md">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button className="group relative px-8 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-accent-pink transition-transform group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check</span>
                Create Task
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
