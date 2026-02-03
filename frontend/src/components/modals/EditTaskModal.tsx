// frontend/src/components/modals/EditTaskModal.tsx
import React, { useState } from 'react';

interface Task {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSave?: (data: unknown) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  // State for form fields (basic example)
  const [taskTitle, setTaskTitle] = useState(task?.title || '');
  const [dueDate] = useState('Tomorrow, 10:00 AM');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState(task?.description || '');
  const [tags, setTags] = useState(['Product', 'Urgent']);
  const [newTag, setNewTag] = useState('');
  const [remindMe] = useState(true);
  const [recurring] = useState(false);

  if (!isOpen) return null;

  const handleAddTask = () => {
    if (onSave) {
        onSave({ 
            title: taskTitle, 
            description, 
            dueDate,
            priority,
            tags,
            remindMe,
            recurring
        });
    }
    onClose();
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 light:bg-white/30 light:backdrop-blur-md">
      {/* MODAL CONTAINER */}
      <div className="group relative w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100 light:animate-enter">
        {/* Glow Effect behind */}
        <div className="absolute -inset-1 rounded-[2.2rem] opacity-30 blur-xl transition duration-1000
                        bg-gradient-to-r from-primary via-purple-600 to-accent-pink
                        group-hover:opacity-50
                        light:from-primary light:via-accent-purple light:to-accent-pink light:opacity-20 light:group-hover:opacity-30"></div>
        {/* Main Card */}
        <div className="relative flex flex-col w-full rounded-[2rem] overflow-hidden
                        bg-[#131118]/90 backdrop-blur-xl border border-white/10 shadow-2xl
                        light:bg-white/60 light:backdrop-blur-xl light:border-white/60 light:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] light:ring-1 light:ring-black/5">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-6 border-b bg-gradient-to-r
                          border-white/5 from-white/5 to-transparent
                          light:border-slate-200/50 light:from-white/50 light:to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary
                              light:bg-gradient-to-tr light:from-primary/10 light:to-accent-purple/10 light:ring-1 light:ring-primary/20">
                <span className="material-symbols-outlined filled">add_task</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight
                             text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-text-secondary-dark
                             light:text-text-main light:bg-gradient-to-r light:from-primary-dark light:via-accent-purple light:to-accent-pink light:bg-clip-text light:text-transparent">
                Create New Task
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center size-10 rounded-full transition-colors
                         hover:bg-white/10 text-text-secondary-dark hover:text-white
                         light:bg-slate-100 light:hover:bg-red-50 light:text-slate-500 light:hover:text-red-500 light:shadow-sm light:border light:border-transparent light:hover:border-red-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* SCROLLABLE BODY */}
          <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
            {/* TASK TITLE */}
            <div className="space-y-3">
              <label htmlFor="task-title" className="block text-sm font-medium ml-1
                                                     text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                Task Title
              </label>
              <div className="relative group/input">
                <input
                  id="task-title"
                  className="w-full text-lg px-6 py-4 rounded-2xl transition-all shadow-inner
                             bg-surface-dark text-white placeholder-[#585366] border border-border-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
                             light:bg-white light:text-text-main light:placeholder-slate-400 light:border-slate-200 light:focus:ring-0 light:focus:outline-none light:shadow-sm light:group-focus-within/input:border-transparent light:gradient-border-input"
                  placeholder="What needs to be done?"
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
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
                <label htmlFor="due-date" className="block text-sm font-medium ml-1
                                                       text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                  Due Date
                </label>
                <div className="relative">
                  <button
                    id="due-date"
                    className="flex items-center w-full px-5 py-3.5 rounded-xl border transition-colors text-left group
                               bg-surface-dark hover:bg-[#252033] text-white border-border-dark
                               light:bg-white light:hover:bg-slate-50 light:text-text-main light:border-slate-200 light:shadow-sm light:hover:border-primary/30"
                  >
                    <span className="material-symbols-outlined mr-3 transition-colors
                                     text-text-secondary-dark group-hover:text-primary
                                     light:text-primary light:bg-primary/10 light:p-1 light:rounded-md light:text-[20px]">
                      calendar_today
                    </span>
                    <span className="text-base light:font-medium">{dueDate}</span>
                    <span className="material-symbols-outlined ml-auto text-sm
                                     text-text-secondary-dark light:text-slate-400 light:group-hover:text-primary light:transition-colors">
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
              {/* Priority Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium ml-1
                                  text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                  Priority
                </label>
                <div className="flex p-1.5 rounded-xl border
                                bg-surface-dark border-border-dark
                                light:bg-slate-100 light:border-slate-200 light:shadow-inner">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-all
                                  ${priority === p ?
                                    (p === 'High' ? 'font-bold text-white bg-gradient-to-r from-orange-600 to-red-500 shadow-lg shadow-orange-900/20 light:from-orange-500 light:to-red-500 light:shadow-orange-500/20 light:ring-1 light:ring-black/5' : 'font-bold text-white bg-primary light:bg-primary light:text-white light:shadow-md') :
                                    'font-medium text-text-secondary-dark hover:text-white hover:bg-white/5 light:text-slate-500 light:hover:text-slate-700 light:hover:bg-white light:hover:shadow-sm'
                                  }`}
                    >
                      {p === 'High' && <span className="material-symbols-outlined text-[18px] filled">flag</span>}
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* DESCRIPTION */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label htmlFor="description" className="block text-sm font-medium ml-1
                                                      text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                  Description
                </label>
                <button className="flex items-center gap-1.5 text-xs font-medium transition-colors px-2 py-1 rounded-full
                                   text-primary hover:text-primary-light hover:bg-primary/10
                                   light:font-bold light:text-primary light:hover:text-primary-dark light:bg-primary/5 light:hover:bg-primary/10 light:border light:border-primary/10">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  AI Generate
                </button>
              </div>
              <textarea
                id="description"
                className="w-full text-base px-6 py-4 rounded-2xl resize-none transition-all
                           bg-surface-dark text-white placeholder-[#585366] border border-border-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
                           light:bg-white light:text-text-main light:placeholder-slate-400 light:border-slate-200 light:focus:border-primary light:focus:ring-1 light:focus:ring-primary light:focus:outline-none light:shadow-sm"
                placeholder="Add details, subtasks, or paste links..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02)', // Dark mode
                }}
              ></textarea>
            </div>
            {/* TAGS & TOGGLES */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
              {/* Tags Input */}
              <div className="flex-1 space-y-3">
                <label className="block text-sm font-medium ml-1
                                  text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                  Tags
                </label>
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl min-h-[56px]
                                bg-surface-dark border border-border-dark
                                light:bg-white light:border-slate-200 light:shadow-sm light:focus-within:border-primary light:focus-within:ring-1 light:focus-within:ring-primary light:transition-all">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full text-xs font-medium
                                 bg-purple-500/10 border border-purple-500/20 text-purple-300
                                 light:bg-gradient-to-r light:from-purple-500/10 light:to-indigo-500/10 light:border-purple-200 light:text-purple-700 light:font-bold light:shadow-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white transition-colors p-0.5 rounded-full light:hover:text-purple-900 light:hover:bg-purple-200/50"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                  <input
                    className="bg-transparent border-none focus:ring-0 p-0 ml-1 min-w-[80px]
                               text-sm text-white placeholder-[#585366]
                               light:text-text-main light:placeholder-slate-400"
                    placeholder="+ Add tag"
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag();
                      }
                    }}
                  />
                </div>
              </div>
              {/* Options */}
              <div className="md:w-auto w-full space-y-3">
                <label className="block text-sm font-medium ml-1 md:text-right
                                  text-text-secondary-dark light:font-semibold light:text-text-secondary-light">
                  Options
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group light:justify-between light:md:justify-start">
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
                                    bg-border-dark group-hover:bg-[#383247]
                                    light:bg-slate-200 light:group-hover:bg-slate-300">
                      <span className={`inline-block w-4 h-4 transform rounded-full transition-transform
                                       ${remindMe ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-text-secondary-dark'}
                                       light:${remindMe ? 'translate-x-6 bg-white shadow-sm ring-1 ring-black/5' : 'translate-x-1 bg-white shadow-sm ring-1 ring-black/5'}`}>
                      </span>
                      {remindMe && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent-pink opacity-100 transition-opacity light:block dark:hidden"></div>}
                    </div>
                    <span className="text-sm transition-colors
                                     text-white group-hover:text-white/80
                                     light:font-medium light:text-text-main">Remind me</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group light:justify-between light:md:justify-start">
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
                                    bg-border-dark group-hover:bg-[#383247]
                                    light:bg-slate-200 light:group-hover:bg-slate-300">
                      <span className={`inline-block w-4 h-4 transform rounded-full transition-transform
                                       ${recurring ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-text-secondary-dark'}
                                       light:${recurring ? 'translate-x-6 bg-white shadow-sm ring-1 ring-black/5' : 'translate-x-1 bg-white shadow-sm ring-1 ring-black/5'}`}>
                      </span>
                    </div>
                    <span className="text-sm transition-colors
                                     text-text-secondary-dark group-hover:text-white/80
                                     light:font-medium light:text-text-secondary-light light:group-hover:text-text-main">Recurring</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-end gap-4 px-8 py-6 border-t backdrop-blur-md
                          bg-surface-dark/50 border-white/5
                          light:bg-slate-50/80 light:border-slate-200 light:rounded-b-[2rem]">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors
                         text-white hover:bg-white/5
                         light:text-slate-500 light:hover:text-slate-800 light:hover:bg-white light:hover:shadow-sm light:border light:border-transparent light:hover:border-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="group relative px-8 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg
                         shadow-primary/25 light:shadow-primary/30"
            >
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
};

export default EditTaskModal;
