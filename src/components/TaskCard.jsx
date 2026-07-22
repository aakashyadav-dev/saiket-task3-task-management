// src/components/TaskCard.jsx
import React, { useState } from 'react';
import { 
  FiEdit2, 
  FiTrash2, 
  FiCheckCircle, 
  FiCircle,
  FiCalendar,
  FiFlag,
  FiX
} from 'react-icons/fi';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onShowToast 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const priorityColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    dueDate.setHours(0, 0, 0, 0);
    return !task.completed && dueDate < today;
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
    if (onShowToast) {
      onShowToast('Task deleted successfully', 'error');
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
    if (onShowToast) {
      onShowToast(
        task.completed ? 'Task marked as pending' : 'Task completed! 🎉',
        'success'
      );
    }
  };

  const dueDateValue = task.dueDate;

  return (
    <div 
      className={`glass-card p-4 hover:scale-[1.02] transition-all duration-300 
        ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          className="mt-0.5 flex-shrink-0 group"
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <FiCheckCircle className="text-2xl text-green-400 group-hover:text-green-300 transition-colors" />
          ) : (
            <FiCircle className="text-2xl text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
                  <FiFlag className="inline mr-1 text-xs" />
                  {priorityLabels[task.priority]}
                </span>
                
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border
                  ${task.completed ? 'status-completed' : 'status-pending'}`}
                >
                  {task.completed ? '✓ Completed' : '⏳ Pending'}
                </span>

                {dueDateValue && (
                  <span className={`flex items-center gap-1 text-xs ${isOverdue(dueDateValue) ? 'text-red-400' : 'text-gray-400'}`}>
                    <FiCalendar className="text-xs" />
                    {formatDate(dueDateValue)}
                    {isOverdue(dueDateValue) && ' (Overdue)'}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all duration-200"
                aria-label="Edit task"
              >
                <FiEdit2 />
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-200"
                aria-label="Delete task"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="glass-card max-w-md w-full animate-scale">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Delete Task</h3>
                <p className="text-gray-400 mt-1">
                  Are you sure you want to delete "{task.title}"? This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;