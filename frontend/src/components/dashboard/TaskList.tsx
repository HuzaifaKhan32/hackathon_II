"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
}

interface TaskListProps {
  onAddTask?: () => void;
  filter?: 'all' | 'today' | 'upcoming';
}

export default function TaskList({ onAddTask, filter = 'all' }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks/');
      let fetchedTasks: Task[] = response.data.map((task: Task, index: number) => ({
        ...task,
        priority: index % 3 === 0 ? 'High' : index % 2 === 0 ? 'Medium' : 'Low',
        tags: index % 4 === 0 ? ['frontend', 'bug'] : index % 3 === 0 ? ['backend', 'feature'] : ['docs'],
      }));

      // Client-side filtering
      if (filter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        fetchedTasks = fetchedTasks.filter(task => task.created_at.startsWith(today));
      } else if (filter === 'upcoming') {
        // Since we don't have due_date, we'll treat 'upcoming' as pending tasks for now
        fetchedTasks = fetchedTasks.filter(task => !task.is_completed);
      }

      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleDelete = async (id: string) => {
    try {
        // Optimistically remove the task from the UI
        const originalTasks = tasks;
        setTasks(tasks.filter(t => t.id !== id));
        toast.success("Task deleted");
        await api.delete(`/tasks/${id}`);
    } catch (error) {
        console.error("Failed to delete task", error);
        toast.error("Failed to delete task");
        // Revert on error
        fetchTasks();
    }
  }

  const handleToggleComplete = async (task: Task) => {
      try {
          const updatedTask = { ...task, is_completed: !task.is_completed };
          // Optimistic update
          setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
          
          await api.put(`/tasks/${task.id}`, { is_completed: updatedTask.is_completed });
          toast.success(updatedTask.is_completed ? "Task completed" : "Task marked active");
      } catch (error) {
          console.error("Failed to update task", error);
          toast.error("Failed to update task");
          // Revert on error
          fetchTasks(); 
      }
  }

  const getTitle = () => {
      switch(filter) {
          case 'today': return "Today's Tasks";
          case 'upcoming': return "Upcoming Tasks";
          default: return "All Tasks";
      }
  }

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
                  {getTitle()}
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
                  <button onClick={fetchTasks} aria-label="Refresh" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                  </button>
                  <button aria-label="Filter" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  </button>
                  <button aria-label="Sort" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">sort</span>
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="flex flex-col gap-3 mt-2">
                {loading ? (
                  <div className="text-center py-10 text-gray-400">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No tasks found. Create one to get started!</div>
                ) : (
                  <AnimatePresence>
                    {tasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task}
                        onDelete={handleDelete}
                        onToggleComplete={handleToggleComplete}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
