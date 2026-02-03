"use client";

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import EditTaskModal from './EditTaskModal';

interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
}

interface TaskData {
  title: string;
  description?: string;
  is_completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (err: unknown) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
    } catch (err: unknown) {
        console.error('Failed to delete', err);
    }
  };

  const handleSave = async (data: TaskData) => {
    if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, data);
    } else {
        await api.post('/tasks/', data);
    }
    fetchTasks();
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Tasks</h2>
        <button
            onClick={handleCreate}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
        >
            <Plus className="h-4 w-4" />
            New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-800">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{task.title}</p>
                  {task.is_completed ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      In Progress
                    </span>
                  )}
                </div>
                {task.description && (
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="truncate">{task.description}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button
                    onClick={() => handleEdit(task)}
                    className="hidden rounded-md bg-white dark:bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(task.id)}
                    className="rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSave}
      />
    </div>
  );
}