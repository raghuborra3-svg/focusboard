import React from 'react';

/**
 * Reusable StatCard component
 * Displays title, dynamic count, icon, subtitle, and an optional visual completion bar.
 */
export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  colorVariant = 'indigo', 
  subtitle, 
  isPercentage = false,
  percentageValue = 0 
}) {
  return (
    <article className={`stat-card stat-card-${colorVariant}`}>
      <div className="stat-card-top">
        <div className="stat-icon-container">
          <Icon size={20} className="stat-icon" />
        </div>
        <span className="stat-card-title">{title}</span>
      </div>

      <div className="stat-card-body">
        <div className="stat-card-value">
          {value}
        </div>
        {subtitle && (
          <p className="stat-card-subtitle">{subtitle}</p>
        )}
      </div>

      {isPercentage && (
        <div className="stat-progress-section" aria-label={`Progress: ${percentageValue}%`}>
          <div className="stat-progress-track">
            <div 
              className="stat-progress-fill" 
              style={{ width: `${Math.min(100, Math.max(0, percentageValue))}%` }} 
            />
          </div>
        </div>
      )}
    </article>
  );
}
