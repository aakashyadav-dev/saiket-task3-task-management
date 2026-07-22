import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterBar = ({ 
  currentFilter, 
  onFilterChange, 
  currentSort, 
  onSortChange 
}) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'priority', label: 'Priority' }
  ];

  return (
    <div className="glass-card p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FiFilter className="text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Filter:</span>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                ${currentFilter === filter.value 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
              aria-label={`Filter by ${filter.label}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
          <span className="text-sm text-gray-400 font-medium">Sort:</span>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            aria-label="Sort tasks"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;