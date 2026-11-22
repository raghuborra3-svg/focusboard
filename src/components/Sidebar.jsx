import React from 'react';
import { 
  CheckSquare, 
  LayoutDashboard, 
  FolderKanban, 
  Calendar, 
  BarChart3, 
  Settings, 
  Sparkles,
  X,
  Target
} from 'lucide-react';

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  isMobileOpen, 
  setIsMobileOpen, 
  totalTasks = 0 
}) {
  const navItems = [
    { id: 'tasks', label: 'My Tasks', icon: LayoutDashboard, badge: totalTasks },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: '3 active' },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'sidebar-open' : ''}`} aria-label="Sidebar Navigation">
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper">
            <Target className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">FocusBoard</span>
            <span className="brand-tag">WORKSPACE</span>
          </div>
          {/* Mobile Close Button */}
          <button 
            type="button" 
            className="sidebar-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">MAIN MENU</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => {
                      setActiveNav(item.id);
                      setIsMobileOpen(false);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={`nav-badge ${isActive ? 'nav-badge-active' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Daily Streak / Focus Card */}
        <div className="sidebar-focus-card">
          <div className="focus-card-header">
            <Sparkles size={16} className="focus-sparkle-icon" />
            <span>Focus Momentum</span>
          </div>
          <p className="focus-card-desc">5-day streak achieved. Keep up the consistent execution!</p>
          <div className="focus-card-progress">
            <div className="focus-card-progress-bar" style={{ width: '82%' }} />
          </div>
          <div className="focus-card-stats">
            <span>Score: 82%</span>
            <span>Target: 100%</span>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <div className="user-avatar-wrapper">
            <div className="user-avatar">AM</div>
            <span className="user-status-dot" title="Active now" />
          </div>
          <div className="user-info">
            <div className="user-name">Alex Morgan</div>
            <div className="user-role">Product Lead</div>
          </div>
        </div>
      </aside>
    </>
  );
}
