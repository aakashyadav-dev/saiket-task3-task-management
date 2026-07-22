import React from 'react';
import { FiHeart, FiGithub } from 'react-icons/fi';

const Footer = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <footer className="glass-card mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-4 text-gray-400">
          <span>Total: {total}</span>
          <span>•</span>
          <span className="text-green-400">Completed: {completed}</span>
          <span>•</span>
          <span className="text-yellow-400">Pending: {pending}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <span>Made with</span>
          <FiHeart className="text-red-400 animate-pulse" />
          <span>by</span>
          <a 
            href="#" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            TaskFlow Team
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <FiGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;