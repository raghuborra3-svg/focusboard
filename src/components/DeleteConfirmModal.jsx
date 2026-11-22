import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  task
}) {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="delete-dialog">
        <div className="delete-icon-wrapper">
          <AlertTriangle size={28} className="delete-warning-icon" />
        </div>

        <div className="delete-dialog-content">
          <h2 id="delete-dialog-title" className="delete-dialog-title">
            Delete Task?
          </h2>
          <p className="delete-dialog-message">
            Are you sure you want to permanently delete{' '}
            <strong className="delete-task-title">"{task.title}"</strong> ({task.id})?
            This action cannot be undone.
          </p>
        </div>

        <div className="delete-dialog-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
