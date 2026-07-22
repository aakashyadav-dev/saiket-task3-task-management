import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by title..."
        className="input-field pl-10 pr-10"
        aria-label="Search tasks"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;