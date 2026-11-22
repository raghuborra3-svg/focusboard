import React from 'react';
import { Plus, Menu, RotateCcw, Bell } from 'lucide-react';

export default function Header({ 
  onOpenCreateModal, 
  onToggleMobileMenu, 
  onResetTasks,
  stats 
}) {
  const currentDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="dashboard-header" role="banner">
      <div className="header-left">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <div className="header-breadcrumb">
            <span>Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-active">My Tasks Overview</span>
          </div>
          <h1 className="header-page-title">Tasks & Focus Overview</h1>
        </div>
      </div>

      <div className="header-right">
        {/* Date pill */}
        <div className="header-date-badge">
          <span>{currentDateFormatted}</span>
        </div>

        {/* Reset Demo Data Button */}
        <button
          type="button"
          className="btn-secondary btn-icon-only"
          onClick={onResetTasks}
          title="Reset to initial 6 sample tasks"
          aria-label="Reset sample tasks"
        >
          <RotateCcw size={16} />
          <span className="btn-text-desktop">Reset Demo</span>
        </button>

        {/* Notification Icon */}
        <div className="notification-wrapper">
          <button
            type="button"
            className="btn-icon-round"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
        </div>

        {/* Primary CTA: Add Task */}
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenCreateModal}
          aria-label="Create new task"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
