import React from 'react';
import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from 'react-icons/fi';

const Stats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    {
      icon: FiList,
      label: 'Total Tasks',
      value: total,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    },
    {
      icon: FiCheckCircle,
      label: 'Completed',
      value: completed,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400'
    },
    {
      icon: FiClock,
      label: 'Pending',
      value: pending,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400'
    },
    {
      icon: FiTrendingUp,
      label: 'Completion Rate',
      value: `${completionRate}%`,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`text-xl ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;