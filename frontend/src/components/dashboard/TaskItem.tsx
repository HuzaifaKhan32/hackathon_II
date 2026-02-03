"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onToggleComplete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityConfig = {
    'High': {
      icon: 'priority_high',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    'Medium': {
      icon: 'priority',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    'Low': {
      icon: 'low_priority',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
  };

  const getPriorityConfig = () => {
    return priorityConfig[task.priority || 'Medium'];
  }

  // Fallback for tags if not provided
  const tags = task.tags || ['frontend', 'bug'];
  const pConfig = getPriorityConfig();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      className={`glass-item group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${task.is_completed ? 'opacity-60 hover:opacity-80' : 'hover:bg-white/5'}`}
    >
      {/* Priority Strip */}
      <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${task.is_completed ? 'bg-gray-600' : 'bg-gradient-to-b from-[#895bf5] to-[#00d4ff]'}`}></div>
      
      <div className="flex items-center gap-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="pl-3 flex items-center">
          <motion.input
            whileTap={{ scale: 0.9 }}
            checked={task.is_completed}
            onChange={(e) => {
              e.stopPropagation();
              onToggleComplete(task);
            }}
            className="custom-checkbox size-6 rounded-full border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer appearance-none checked:bg-primary checked:border-transparent"
            type="checkbox"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className={`text-base font-medium truncate group-hover:text-primary transition-colors ${task.is_completed ? 'text-gray-400 line-through' : 'text-white'}`}>{task.title}</h3>
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 mt-1 text-xs text-gray-400"
              >
                {task.description && <span className="truncate max-w-[300px]">{task.description}</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          {/* Action buttons appear on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-2 border-l border-white/10">
            <motion.button whileTap={{ scale: 0.9 }} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white" onClick={(e) => {e.stopPropagation(); toast.info('Edit coming soon')}}>
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}
              className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </motion.button>
          </div>
          <motion.button
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400"
          >
            <span className="material-symbols-outlined text-xl">expand_more</span>
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden pl-12"
          >
            <p className="text-sm text-gray-300 mb-4">{task.description || 'No description available.'}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>{new Date(task.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>{new Date(task.created_at).toLocaleTimeString()}</span>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${pConfig.bgColor} ${pConfig.color}`}>
                  <span className="material-symbols-outlined text-base">{pConfig.icon}</span>
                  <span className="font-medium">{task.priority || 'Medium'}</span>
              </div>
              <div className="flex items-center gap-2">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
