"use client";

import { useState } from 'react';
import TaskList from '@/components/dashboard/TaskList';
import AddTaskModal from '@/components/modals/AddTaskModal';

export default function UpcomingTasksPage() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      <TaskList filter="upcoming" onAddTask={() => setIsAddTaskOpen(true)} />
      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </>
  );
}