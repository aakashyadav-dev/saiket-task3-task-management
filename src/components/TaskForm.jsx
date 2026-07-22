// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || '');
    } else {
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
    setError('');
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    const taskData = {
      title: title.trim(),
      priority,
      dueDate,
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    // Reset form
    setTitle('');
    setPriority('medium');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDueDate(tomorrow.toISOString().split('T')[0]);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card animate-fade-in">
      <div className="flex flex-col gap-3">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="What do you need to do?"
              className="input-field"
              aria-label="Task title"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field w-full sm:w-32"
              aria-label="Task priority"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-field w-full sm:w-40"
              aria-label="Due date"
            />

            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FiPlus className="text-lg" />
              {editingTask ? 'Update' : 'Add'}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;