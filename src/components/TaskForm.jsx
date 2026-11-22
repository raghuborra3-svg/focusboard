import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { CATEGORIES, STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/sampleTasks';

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit = null
}) {
  const isEditing = Boolean(taskToEdit);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Helper for formatted today's date in YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Populate form when modal opens or taskToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        setCategory(taskToEdit.category || 'Design');
        setStatus(taskToEdit.status || 'To do');
        setPriority(taskToEdit.priority || 'Medium');
        setDueDate(taskToEdit.dueDate || getTodayDateString());
      } else {
        // Reset to clean defaults
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        setDueDate(getTodayDateString());
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, taskToEdit]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation function
  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required and cannot be empty.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Task title should be at least 3 characters long.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ title: true, dueDate: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (isEditing) {
      const updatedTask = {
        ...taskToEdit,
        title: trimmedTitle,
        description: trimmedDesc,
        category,
        status,
        priority,
        dueDate,
        updatedAt: new Date().toISOString()
      };
      onSubmit(updatedTask);
    } else {
      const newTask = {
        id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
        title: trimmedTitle,
        description: trimmedDesc,
        category,
        status,
        priority,
        dueDate,
        createdAt: new Date().toISOString()
      };
      onSubmit(newTask);
    }

    onClose();
  };

  // Filter out 'All Categories' for the form dropdown
  const categoryOptions = CATEGORIES.filter(c => c !== 'All Categories');

  return (
    <div 
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-modal-title"
    >
      <div className="task-form-dialog">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <h2 id="task-form-modal-title" className="modal-title">
              {isEditing ? `Edit Task · ${taskToEdit?.id}` : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditing 
                ? 'Update task details, schedule, or priority status.' 
                : 'Fill in the information below to add a new task to FocusBoard.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Title Field */}
          <div className="form-field">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              className={`form-input ${touched.title && errors.title ? 'form-input-error' : ''}`}
              placeholder="e.g. Design responsive dashboard mockup in Figma"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: null }));
                }
              }}
              onBlur={() => handleBlur('title')}
              autoFocus
              aria-required="true"
              aria-invalid={Boolean(touched.title && errors.title)}
              aria-describedby={errors.title ? "task-title-error" : undefined}
            />
            {touched.title && errors.title && (
              <div id="task-title-error" className="form-error-msg" role="alert">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-field">
            <label htmlFor="task-desc-input" className="form-label">
              Description <span className="label-optional">(Optional)</span>
            </label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              rows={4}
              placeholder="Provide context, acceptance criteria, or relevant links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />
            <div className="form-field-hint">
              <span>Markdown or plain text</span>
              <span>{description.length}/500</span>
            </div>
          </div>

          {/* Row: Category & Status */}
          <div className="form-row">
            <div className="form-field form-field-half">
              <label htmlFor="task-category-select" className="form-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-field form-field-half">
              <label htmlFor="task-status-select" className="form-label">
                Status <span className="required-star">*</span>
              </label>
              <select
                id="task-status-select"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-required="true"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row: Priority & Due Date */}
          <div className="form-row">
            <div className="form-field form-field-half">
              <label htmlFor="task-priority-select" className="form-label">
                Priority <span className="required-star">*</span>
              </label>
              <select
                id="task-priority-select"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                aria-required="true"
              >
                {PRIORITY_OPTIONS.map((pr) => (
                  <option key={pr} value={pr}>{pr}</option>
                ))}
              </select>
            </div>

            <div className="form-field form-field-half">
              <label htmlFor="task-duedate-input" className="form-label">
                Due Date <span className="required-star">*</span>
              </label>
              <div className="date-input-wrapper">
                <input
                  id="task-duedate-input"
                  type="date"
                  className={`form-input ${touched.dueDate && errors.dueDate ? 'form-input-error' : ''}`}
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    if (errors.dueDate) {
                      setErrors((prev) => ({ ...prev, dueDate: null }));
                    }
                  }}
                  onBlur={() => handleBlur('dueDate')}
                  aria-required="true"
                  aria-invalid={Boolean(touched.dueDate && errors.dueDate)}
                />
              </div>
              {touched.dueDate && errors.dueDate && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
