import React from 'react';
import { FiInbox } from 'react-icons/fi';
import TaskCard from './TaskCard';

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onShowToast 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <FiInbox className="text-4xl text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">No tasks here</h3>
            <p className="text-gray-400 mt-1">
              Start by adding a new task using the form above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TaskCard
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onShowToast={onShowToast}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;