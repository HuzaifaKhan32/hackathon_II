"use client";

interface TaskListProps {
  onAddTask?: () => void;
}

export default function TaskList({ onAddTask }: TaskListProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto relative bg-[#0f0f12] text-white font-display">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex h-full grow flex-col relative z-10">
        <div className="px-6 md:px-10 flex flex-1 justify-center py-8">
          <div className="flex flex-col w-full max-w-[1200px] flex-1 gap-8">
            
            {/* Top Bar: Search & Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
                  All Tasks
                </h1>
                <p className="text-gray-400 text-base font-normal flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                  Your daily priorities, organized by AI
                </p>
              </div>
              
              {/* New Task Button */}
              <button 
                onClick={onAddTask}
                className="relative group overflow-hidden rounded-full bg-gradient-to-br from-[#895bf5] to-[#ff4b91] px-6 py-3 text-white shadow-lg transition-transform active:scale-95 hover:shadow-primary/40 hover:shadow-xl self-start md:self-auto"
              >
                <span className="relative z-10 flex items-center gap-2 font-medium text-sm">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  New Task
                </span>
                <div className="absolute inset-0 bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity"></div>
              </button>
            </div>

            {/* Dashboard Glass Panel */}
            <div className="glass-panel rounded-2xl p-6 min-h-[600px] flex flex-col gap-6">
              
              {/* Toolbar & Search */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar with AI Glow */}
                <div className="relative w-full md:w-2/3 group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-30 group-focus-within:opacity-100 transition duration-500 blur-sm"></div>
                  <div className="relative flex h-12 w-full items-center rounded-full bg-[#181524] px-4 shadow-inner">
                    <span className="material-symbols-outlined text-gray-400 mr-3">temp_preferences_custom</span>
                    <input 
                      className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-sm font-medium h-full focus:outline-none" 
                      placeholder="Ask AI to find a task or analyze priorities..." 
                      type="text"
                    />
                    <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5">
                      <span className="text-[10px] text-gray-400 font-bold tracking-wider">CMD+K</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button aria-label="Filter" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  </button>
                  <button aria-label="Sort" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">sort</span>
                  </button>
                </div>
              </div>

              {/* AI Suggestion Pill */}
              <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20 self-start animate-pulse">
                <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                <p className="text-sm text-primary/90 font-medium">Suggestion: Focus on <span className="text-white underline decoration-primary/50 underline-offset-2">Review Q3 Analytics</span> first based on your deadline patterns.</p>
              </div>

              {/* Tasks List */}
              <div className="flex flex-col gap-3 mt-2">
                
                {/* Task 1: High Priority */}
                <div className="glass-item group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer">
                  {/* Priority Strip */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-[#ff4b91] to-[#ff9068] shadow-[0_0_10px_rgba(255,75,145,0.5)]"></div>
                  <div className="pl-3 flex items-center">
                    <input className="custom-checkbox size-6 rounded-full border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer appearance-none checked:bg-primary checked:border-transparent" type="checkbox"/>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base font-medium text-white truncate group-hover:text-primary transition-colors">Review Q3 AI Analytics</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-red-400 font-medium bg-red-400/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        Due Today
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">Project Alpha</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-gray-300">#Work</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-2 border-l border-white/10">
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Task 2: Medium Priority */}
                <div className="glass-item group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer">
                  {/* Priority Strip */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-[#895bf5] to-[#00d4ff]"></div>
                  <div className="pl-3 flex items-center">
                    <input className="custom-checkbox size-6 rounded-full border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer appearance-none checked:bg-primary checked:border-transparent" type="checkbox"/>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base font-medium text-white truncate group-hover:text-primary transition-colors">Update Neural Network Weights</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-blue-400 font-medium bg-blue-400/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        Tomorrow
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">Model V2</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-gray-300">#Dev</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-2 border-l border-white/10">
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Task 3: Low Priority */}
                <div className="glass-item group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer opacity-90 hover:opacity-100">
                  {/* Priority Strip */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-[#00f260] to-[#0575e6]"></div>
                  <div className="pl-3 flex items-center">
                    <input className="custom-checkbox size-6 rounded-full border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer appearance-none checked:bg-primary checked:border-transparent" type="checkbox"/>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base font-medium text-white truncate group-hover:text-primary transition-colors">Brainstorm Interface Ideas</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-green-400 font-medium bg-green-400/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">event_upcoming</span>
                        Friday
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-gray-300">#Design</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-2 border-l border-white/10">
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Task 4: Completed Example */}
                <div className="glass-item group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer opacity-50 hover:opacity-80">
                  {/* Priority Strip (Gray for done) */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gray-600"></div>
                  <div className="pl-3 flex items-center">
                    <input defaultChecked className="custom-checkbox size-6 rounded-full border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer appearance-none checked:bg-primary checked:border-transparent" type="checkbox"/>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-400 line-through truncate">Weekly Sync with Design Team</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-gray-500 line-through">#Meeting</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-2 border-l border-white/10">
                      <button className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}