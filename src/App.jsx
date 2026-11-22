import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Layers,
  Sparkles
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_TASKS } from './data/sampleTasks';

const STORAGE_KEY = 'focusboard_tasks';

export default function App() {
  // Synchronized tasks state backed by browser localStorage
  const [tasks, setTasks, resetTasksToDefault] = useLocalStorage(STORAGE_KEY, INITIAL_TASKS);

  // Navigation & Drawer State
  const [activeNav, setActiveNav] = useState('tasks');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // --- Dynamic Dashboard Statistics (Computed from current task state) ---
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      todo,
      completionRate,
    };
  }, [tasks]);

  // Status Counts for Filter Tabs
  const statusCounts = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'To do').length,
      inProgress: tasks.filter((t) => t.status === 'In progress').length,
      completed: tasks.filter((t) => t.status === 'Completed').length,
    };
  }, [tasks]);

  // Check if any filters are actively applied
  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All Categories' ||
    sortBy !== 'dueDateAsc'
  );

  // Clear all filters back to default
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All Categories');
    setSortBy('dueDateAsc');
  };

  // --- CRUD Task Handlers ---

  // 1. Create / Add Task
  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast(`Task "${newTask.title}" added successfully!`);
  };

  // 2. Edit / Update Task
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    showToast(`Task "${updatedTask.title}" updated.`);
  };

  // Form Modal Submitter
  const handleFormSubmit = (taskData) => {
    if (taskToEdit) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  // 3. Delete Task
  const handleConfirmDelete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    showToast(`Task "${task?.title || taskId}" removed.`);
  };

  // 4. Quick Status Update
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
    showToast(`Status updated to "${newStatus}"`);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsFormModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Reset to Demo Sample Tasks
  const handleResetDemoData = () => {
    if (window.confirm('Reset all tasks to the initial 6 sample tasks? Any custom tasks will be replaced.')) {
      resetTasksToDefault();
      handleClearFilters();
      showToast('Demo sample tasks restored.');
    }
  };

  // --- Filtered and Sorted Tasks Dataset ---
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search Term (Case-insensitive title or description)
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim();
          const matchesTitle = task.title?.toLowerCase().includes(query);
          const matchesDesc = task.description?.toLowerCase().includes(query);
          if (!matchesTitle && !matchesDesc) return false;
        }

        // Status Filter
        if (statusFilter !== 'All') {
          if (task.status !== statusFilter) return false;
        }

        // Priority Filter
        if (priorityFilter !== 'All') {
          if (task.priority !== priorityFilter) return false;
        }

        // Category Filter
        if (categoryFilter !== 'All Categories') {
          if (task.category !== categoryFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting Logic
        if (sortBy === 'dueDateAsc') {
          return (a.dueDate || '').localeCompare(b.dueDate || '');
        }
        if (sortBy === 'dueDateDesc') {
          return (b.dueDate || '').localeCompare(a.dueDate || '');
        }
        if (sortBy === 'priority') {
          const priorityWeight = { High: 3, Medium: 2, Low: 1 };
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        if (sortBy === 'titleAsc') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
      });
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy]);

  return (
    <div className="focusboard-app">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="app-toast" role="status" aria-live="polite">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="dashboard-layout">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
          totalTasks={stats.total}
        />

        {/* Right Main Content Area */}
        <div className="dashboard-main-area">
          {/* Header */}
          <Header
            onOpenCreateModal={handleOpenCreateModal}
            onToggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onResetTasks={handleResetDemoData}
            stats={stats}
          />

          <main className="dashboard-content" role="main">
            {/* Overview / Statistics Cards Grid */}
            <section className="stats-grid" aria-label="Dashboard Statistics Overview">
              <StatCard
                title="Total Tasks"
                value={stats.total}
                icon={Layers}
                colorVariant="indigo"
                subtitle="All logged workspace tasks"
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={Clock}
                colorVariant="amber"
                subtitle="Active sprint execution"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={CheckCircle2}
                colorVariant="emerald"
                subtitle="Successfully delivered"
              />
              <StatCard
                title="Completion Rate"
                value={`${stats.completionRate}%`}
                icon={TrendingUp}
                colorVariant="violet"
                subtitle={`${stats.completed} of ${stats.total} finished`}
                isPercentage={true}
                percentageValue={stats.completionRate}
              />
            </section>

            {/* Focus Notes 3-Slide Carousel */}
            <FocusNotes />

            {/* Task Controls: Search Bar & Filter Tabs */}
            <section className="task-controls-section" aria-label="Task Search and Filters">
              <div className="controls-row">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onClearSearch={() => setSearchTerm('')}
                />
              </div>

              <FilterTabs
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                statusCounts={statusCounts}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleClearFilters}
              />
            </section>

            {/* Task List Section */}
            <TaskList
              tasks={filteredTasks}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onStatusChange={handleStatusChange}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
              onOpenCreateModal={handleOpenCreateModal}
            />
          </main>
        </div>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
      />
    </div>
  );
}
