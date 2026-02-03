"use client";

import { useState } from 'react';
import TaskList from '@/components/dashboard/TaskList';
import AddTaskModal from '@/components/modals/AddTaskModal';

export default function TasksPage() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      <TaskList onAddTask={() => setIsAddTaskOpen(true)} />
      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </>
  );
}