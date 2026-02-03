"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}

export default function AddTaskModal({ isOpen, onClose, onTaskCreated }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [remindMe, setRemindMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/tasks/', {
        title,
        description,
        due_date: dueDate ? dueDate.toISOString() : null,
        priority,
        tags,
        is_completed: false
      });
      toast.success("Task created successfully!");
      // Reset state
      setTitle('');
      setDescription('');
      setDueDate(null);
      setPriority('medium');
      setTags([]);
      setRemindMe(false);
      
      if (onTaskCreated) onTaskCreated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          {/* MODAL CONTAINER */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="group relative w-full max-w-2xl z-10"
          >
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      <DatePicker
                        selected={dueDate}
                        onChange={(date: Date | null) => setDueDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="flex items-center w-full bg-[#1e1a29] hover:bg-[#252033] text-white px-5 py-3.5 rounded-xl border border-[#2d2839] transition-colors text-left"
                        placeholderText="Select date and time"
                      />
                    </div>
                  </div>
                  {/* Priority Selector */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#a59cba] ml-1">Priority</label>
                    <div className="flex bg-[#1e1a29] p-1.5 rounded-xl border border-[#2d2839]">
                      {(['low', 'medium', 'high'] as const).map((p) => (
                        <button 
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all
                            ${priority === p 
                              ? `text-white ${
                                  p === 'low' ? 'bg-blue-500/80' : 
                                  p === 'medium' ? 'bg-yellow-500/80' : 
                                  'bg-gradient-to-r from-orange-600 to-red-500 shadow-lg shadow-orange-900/20'
                                }` 
                              : 'text-[#a59cba] hover:text-white hover:bg-white/5'
                            }`
                          }
                        >
                          {p === 'high' && <span className="material-symbols-outlined text-[18px] filled">flag</span>}
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      ))}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                          <span>{tag}</span>
                          <button onClick={() => setTags(tags.filter((_, i) => i !== index))} className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                        </div>
                      ))}
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-[#585366] min-w-[80px] p-0 ml-1 focus:outline-none" 
                        placeholder="+ Add tag" 
                        type="text"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                            e.preventDefault();
                            setTags([...tags, e.currentTarget.value.trim()]);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                  {/* Options */}
                  <div className="md:w-auto w-full space-y-3">
                    <label className="block text-sm font-medium text-[#a59cba] ml-1 md:text-right">Options</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-[#2d2839] group-hover:bg-[#383247]">
                           <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={remindMe}
                            onChange={(e) => setRemindMe(e.target.checked)}
                          />
                          <span className={`${remindMe ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}></span>
                        </div>
                        <span className="text-sm text-white group-hover:text-white/80">Remind me</span>
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
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative px-8 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-accent-pink transition-transform group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-2">
                    {isLoading ? (
                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    ) : (
                        <span className="material-symbols-outlined text-[18px]">check</span>
                    )}
                    {isLoading ? 'Creating...' : 'Create Task'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
