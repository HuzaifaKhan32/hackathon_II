"use client";

import React from 'react';

export default function DashboardOverview() {
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
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-4xl font-bold leading-tight tracking-tight">Dashboard</h2>
                <p className="text-[#a59cba] text-base font-normal">Overview of your prioritized schedule</p>
              </div>
              
              {/* Search Bar Component Adapted */}
              <div className="w-full md:w-auto md:min-w-[400px]">
                <label className="flex flex-col h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg shadow-black/20">
                    <div className="text-[#a59cba] flex border-none bg-[#1e1a29] items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-[#1e1a29] focus:border-none h-full placeholder:text-[#a59cba] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all" 
                      placeholder="Ask AI to create a task..."
                    />
                    <button className="bg-[#1e1a29] px-4 rounded-r-xl border-l border-white/5 hover:text-primary transition-colors text-gray-400">
                      <span className="material-symbols-outlined">mic</span>
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Large Chart Section (Span 2) */}
              <div className="lg:col-span-2 flex flex-col gap-4 p-6 rounded-2xl bg-[#1e1a29] border border-white/10 shadow-xl">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Weekly Output</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-white text-3xl font-bold">42 Tasks</p>
                      <span className="text-green-400 text-sm font-medium flex items-center bg-green-400/10 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12%
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                
                {/* Chart SVG Adapted */}
                <div className="w-full h-[200px] mt-4 relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#895bf5" stopOpacity="0.5"></stop>
                        <stop offset="100%" stopColor="#895bf5" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,120 C50,120 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,100 400,100 C450,100 450,10 500,10 V150 H0 Z" fill="url(#chartGradient)"></path>
                    <path d="M0,120 C50,120 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,100 400,100 C450,100 450,10 500,10" fill="none" stroke="#895bf5" strokeLinecap="round" strokeWidth="3"></path>
                  </svg>
                  {/* Tooltip Sim */}
                  <div className="absolute top-[20%] left-[60%] transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded shadow-lg border border-white/10">
                    Wed: 14 Tasks
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-b border-r border-white/10"></div>
                  </div>
                  <div className="absolute top-[28%] left-[60%] w-3 h-3 bg-white border-2 border-primary rounded-full shadow-[0_0_10px_#895bf5]"></div>
                </div>
              </div>

              {/* Card Component: Daily Streak (Span 1) */}
              <div className="lg:col-span-1">
                <div className="bg-cover bg-center h-full flex flex-col items-stretch justify-between rounded-2xl shadow-xl relative overflow-hidden group" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvJITIIyJRQkNCF2S5szZj27__awHDP_fFcxYqgbwWVudqVVHsZ90DVlG1GeG__PZwHn0u7VdvlDfU3cIGqZem0S49nOhrvKzzSkxzVBsopIz5PK4bvxupEStzTRUy1pITMGSYmSRKnAQC4iF6jCU4F0A_sJubo6ZoI4QEDHn1fibgNr1p3Yu9Ha-f30RGwGOsPrLHKXSrNX2rXULdOz0ZgsxzCr68DmL_jJkZY3nmCWJRJJ7RfzJZEtYWlMnKhQg30NkNVY54Ky1X")' }}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  <div className="relative z-10 p-5 flex justify-end">
                    <div className="bg-white/20 backdrop-blur-md border border-white/10 rounded-full p-2 text-white">
                      <span className="material-symbols-outlined">local_fire_department</span>
                    </div>
                  </div>
                  <div className="relative z-10 flex w-full items-end justify-between gap-4 p-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-3xl font-bold leading-tight">12 Day Streak</p>
                      <p className="text-gray-200 text-sm font-medium leading-normal">Keep the momentum going!</p>
                      <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Task List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Today's Priority</h3>
                <div className="flex gap-2">
                  <button className="text-sm font-medium text-primary hover:text-white transition-colors">View All</button>
                </div>
              </div>
              
              {/* Task Item 1 */}
              <div className="group flex items-center justify-between p-4 rounded-xl bg-[#1e1a29] border border-white/10 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center size-12 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">palette</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-semibold group-hover:text-primary transition-colors">Redesign User Dashboard</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">Due 5:00 PM</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-xs text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded-full border border-pink-400/20">High Priority</span>
                    </div>
                  </div>
                </div>
                <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>

              {/* Task Item 2 */}
              <div className="group flex items-center justify-between p-4 rounded-xl bg-[#1e1a29] border border-white/10 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center size-12 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">code</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-semibold group-hover:text-primary transition-colors">Implement Auth Flow</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">Due Tomorrow</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">Development</span>
                    </div>
                  </div>
                </div>
                <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>

              {/* Task Item 3 */}
              <div className="group flex items-center justify-between p-4 rounded-xl bg-[#1e1a29] border border-white/10 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center size-12 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">smart_toy</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-semibold group-hover:text-primary transition-colors">AI Model Training Review</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">In Progress</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">AI Task</span>
                    </div>
                  </div>
                </div>
                <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>
            </div>

            {/* Create New Task Floating Action Button (Mobile/Tablet visible mostly) */}
            <div className="fixed bottom-8 right-8 lg:hidden">
              <button className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-[#895bf5] to-[#a27bfc] text-white shadow-2xl hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}