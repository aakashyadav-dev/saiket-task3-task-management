// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Stats from './components/Stats';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Add task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('Task added successfully! 🎉', 'success');
  };

  // Edit task
  const updateTask = (id, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ));
    setEditingTask(null);
    showToast('Task updated successfully! ✏️', 'success');
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    showToast('Task deleted successfully', 'error');
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Clear completed tasks
  const clearCompleted = () => {
    const hasCompleted = tasks.some(task => task.completed);
    if (!hasCompleted) {
      showToast('No completed tasks to clear', 'info');
      return;
    }
    setTasks(prev => prev.filter(task => !task.completed));
    showToast('All completed tasks cleared', 'success');
  };

  // Delete all tasks
  const deleteAll = () => {
    if (tasks.length === 0) {
      showToast('No tasks to delete', 'info');
      return;
    }
    setTasks([]);
    showToast('All tasks deleted', 'error');
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(task => 
        task.title.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      default:
        break;
    }

    return result;
  }, [tasks, filter, searchTerm, sortBy]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // Apply dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Toast Notification */}
          {toast.visible && (
            <div className={`fixed top-6 right-6 z-50 max-w-md animate-slide-up
              ${toast.type === 'success' ? 'bg-green-500/90' : 
                toast.type === 'error' ? 'bg-red-500/90' : 
                'bg-blue-500/90'} 
              glass px-6 py-4 rounded-xl shadow-2xl`}
            >
              <p className="text-white font-medium">{toast.message}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Header */}
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Stats */}
            <Stats tasks={tasks} />

            {/* Task Form */}
            <TaskForm 
              onAddTask={addTask}
              editingTask={editingTask}
              onUpdateTask={updateTask}
              onCancelEdit={() => setEditingTask(null)}
            />

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <SearchBar 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm} 
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCompleted}
                  className="flex-1 px-4 py-2.5 bg-green-500/10 text-green-400 font-medium rounded-xl 
                           hover:bg-green-500/20 transition-all duration-200 hover:scale-105"
                >
                  Clear Completed
                </button>
                <button
                  onClick={deleteAll}
                  className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 font-medium rounded-xl 
                           hover:bg-red-500/20 transition-all duration-200 hover:scale-105"
                >
                  Delete All
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar 
              currentFilter={filter}
              onFilterChange={setFilter}
              currentSort={sortBy}
              onSortChange={setSortBy}
            />

            {/* Task List */}
            <TaskList 
              tasks={filteredAndSortedTasks}
              onToggleComplete={toggleComplete}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              onShowToast={showToast}
            />

            {/* Footer */}
            <Footer tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;