import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiCheckCircle } from 'react-icons/fi';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };
    
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="glass-card flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/25">
          <FiCheckCircle className="text-2xl text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-sm text-gray-400">Manage your tasks efficiently</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300 hidden sm:block">{currentDate}</span>
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FiSun className="text-xl text-yellow-400" />
          ) : (
            <FiMoon className="text-xl text-primary" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;