import React from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Pencil, 
  Trash2, 
  AlertTriangle,
  Flame,
  Tag
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange,
  viewMode = 'grid' 
}) {
  const isCompleted = task.status === 'Completed';

  // Format Due Date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Check if overdue
  const isOverdue = () => {
    if (isCompleted || !task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    return due < today;
  };

  // Priority Styles
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return {
          label: 'High',
          className: 'priority-badge-high',
          icon: Flame
        };
      case 'Medium':
        return {
          label: 'Medium',
          className: 'priority-badge-medium',
          icon: AlertTriangle
        };
      case 'Low':
      default:
        return {
          label: 'Low',
          className: 'priority-badge-low',
          icon: Clock
        };
    }
  };

  // Status Styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return {
          label: 'Completed',
          className: 'status-badge-completed',
          icon: CheckCircle2
        };
      case 'In progress':
        return {
          label: 'In Progress',
          className: 'status-badge-progress',
          icon: Clock
        };
      case 'To do':
      default:
        return {
          label: 'To Do',
          className: 'status-badge-todo',
          icon: Circle
        };
    }
  };

  const priorityData = getPriorityBadge(task.priority);
  const statusData = getStatusBadge(task.status);
  const StatusIcon = statusData.icon;
  const PriorityIcon = priorityData.icon;
  const overdue = isOverdue();

  return (
    <article 
      className={`task-card ${isCompleted ? 'task-card-completed' : ''} ${viewMode === 'list' ? 'task-card-list-view' : ''}`}
      aria-labelledby={`task-title-${task.id}`}
    >
      {/* Top Meta Bar */}
      <div className="task-card-meta">
        <div className="task-meta-left">
          <span className="task-id-badge">{task.id}</span>
          {task.category && (
            <span className={`task-category-badge category-${task.category.toLowerCase()}`}>
              <Tag size={11} className="category-icon" />
              {task.category}
            </span>
          )}
        </div>

        {/* Priority Badge */}
        <div className="task-meta-right">
          <span className={`priority-badge ${priorityData.className}`}>
            <PriorityIcon size={12} />
            <span>{priorityData.label}</span>
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="task-card-main">
        <h3 id={`task-title-${task.id}`} className={`task-title ${isCompleted ? 'title-completed' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="task-card-footer">
        <div className="task-footer-left">
          {/* Due Date Indicator */}
          <div className={`task-due-date ${overdue ? 'due-date-overdue' : ''}`}>
            <Calendar size={14} className="due-date-icon" />
            <span>{formatDate(task.dueDate)}</span>
            {overdue && <span className="overdue-tag">Overdue</span>}
          </div>

          {/* Inline Quick Status Selector */}
          <div className="task-status-selector-wrapper">
            <label htmlFor={`status-select-${task.id}`} className="sr-only">Change Status for {task.title}</label>
            <div className={`status-pill ${statusData.className}`}>
              <StatusIcon size={13} className="status-pill-icon" />
              <select
                id={`status-select-${task.id}`}
                className="status-inline-select"
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                aria-label={`Status for ${task.title}`}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="task-card-actions">
          <button
            type="button"
            className="task-action-btn edit-action-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label={`Edit task: ${task.title}`}
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="task-action-btn delete-action-btn"
            onClick={() => onDelete(task)}
            title="Delete task"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
