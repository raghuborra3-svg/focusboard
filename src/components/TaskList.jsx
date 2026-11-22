import React, { useState } from 'react';
import { LayoutGrid, List, Inbox, Plus, RotateCcw } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ 
  tasks = [], 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onClearFilters, 
  hasActiveFilters, 
  onOpenCreateModal 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  return (
    <section className="task-list-section" aria-labelledby="task-list-heading">
      {/* Task List Header */}
      <div className="task-list-header">
        <div className="task-list-heading-group">
          <h2 id="task-list-heading" className="task-section-title">
            Tasks
          </h2>
          <span className="task-count-pill" aria-label={`${tasks.length} tasks displayed`}>
            {tasks.length}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="view-mode-toggle" role="group" aria-label="Toggle view mode">
          <button
            type="button"
            className={`view-mode-btn ${viewMode === 'grid' ? 'view-mode-active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
            aria-label="Grid View"
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            className={`view-mode-btn ${viewMode === 'list' ? 'view-mode-active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
            aria-label="List View"
            aria-pressed={viewMode === 'list'}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="task-empty-state">
          <div className="empty-state-icon-box">
            <Inbox size={40} className="empty-state-icon" />
          </div>
          <h3 className="empty-state-title">
            {hasActiveFilters ? "No matching tasks found" : "No tasks yet"}
          </h3>
          <p className="empty-state-desc">
            {hasActiveFilters 
              ? "We couldn't find any tasks matching your active search or filter criteria."
              : "Your task board is clear! Create your first task to kickstart your productivity."}
          </p>
          <div className="empty-state-actions">
            {hasActiveFilters ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={onClearFilters}
              >
                <RotateCcw size={16} />
                <span>Reset Filters</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenCreateModal}
              >
                <Plus size={16} />
                <span>Add Your First Task</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Task Grid or List Container */
        <div className={`tasks-container ${viewMode === 'list' ? 'tasks-container-list' : 'tasks-container-grid'}`}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              viewMode={viewMode}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}
