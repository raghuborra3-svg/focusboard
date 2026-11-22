import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/sampleTasks';

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  statusCounts = {},
  hasActiveFilters,
  onResetFilters
}) {
  const tabs = [
    { id: 'All', label: 'All Tasks', count: statusCounts.all ?? 0 },
    { id: 'To do', label: 'To Do', count: statusCounts.todo ?? 0 },
    { id: 'In progress', label: 'In Progress', count: statusCounts.inProgress ?? 0 },
    { id: 'Completed', label: 'Completed', count: statusCounts.completed ?? 0 },
  ];

  return (
    <div className="filters-container">
      {/* Status Segmented Tabs */}
      <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab ${isActive ? 'status-tab-active' : ''}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              <span className={`tab-badge ${isActive ? 'tab-badge-active' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Dropdowns Row */}
      <div className="filter-dropdowns">
        {/* Priority Filter */}
        <div className="select-wrapper">
          <label htmlFor="priority-filter-select" className="sr-only">Filter by Priority</label>
          <select
            id="priority-filter-select"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="select-wrapper">
          <label htmlFor="category-filter-select" className="sr-only">Filter by Category</label>
          <select
            id="category-filter-select"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="select-wrapper">
          <label htmlFor="sort-by-select" className="sr-only">Sort Tasks</label>
          <select
            id="sort-by-select"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort tasks"
          >
            <option value="dueDateAsc">Due Date (Earliest)</option>
            <option value="dueDateDesc">Due Date (Latest)</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="titleAsc">Title (A - Z)</option>
          </select>
        </div>

        {/* Reset Active Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            title="Reset all filters"
            aria-label="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
