import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Flame, 
  Award,
  Compass
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: "FOCUS PRINCIPLE · 1 OF 3",
    title: "Plan Your Day with Intention",
    description: "Organise your priorities and focus on what matters most. Identify your top 3 non-negotiable tasks before diving into messages or inbox triage.",
    quote: "“The key is not to prioritize what's on your schedule, but to schedule your priorities.”",
    author: "Stephen Covey",
    icon: Compass,
    gradientClass: "slide-theme-blue"
  },
  {
    id: 2,
    tag: "DEEP WORK · 2 OF 3",
    title: "Deep Work & Single-Task Execution",
    description: "Eliminate distractions and tackle high-priority items first. Commit to 50-minute uninterrupted sprints with 10-minute active recovery intervals for peak output.",
    quote: "“To produce at your peak level you need to work for extended periods with full concentration.”",
    author: "Cal Newport",
    icon: Flame,
    gradientClass: "slide-theme-violet"
  },
  {
    id: 3,
    tag: "REVIEW & ITERATE · 3 OF 3",
    title: "Reflect, Calibrate & Celebrate",
    description: "Review completed tasks at the end of each day. Celebrate daily milestones, clear operational friction, and set up clear momentum for tomorrow.",
    quote: "“Small daily improvements over time lead to stunning, long-lasting results.”",
    author: "Robin Sharma",
    icon: Award,
    gradientClass: "slide-theme-emerald"
  }
];

export default function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Circular navigation handlers
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const activeSlideData = SLIDES[currentSlide];
  const IconComponent = activeSlideData.icon;

  return (
    <section 
      className={`focus-notes-card ${activeSlideData.gradientClass}`}
      aria-roledescription="carousel"
      aria-label="Focus Notes carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="focus-notes-decor-circle" aria-hidden="true" />
      
      {/* Top Header with Tag and Controls */}
      <div className="focus-notes-header">
        <div className="focus-tag-pill">
          <Sparkles size={14} className="focus-tag-icon" />
          <span>{activeSlideData.tag}</span>
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="focus-carousel-controls">
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handlePrev}
            aria-label="Previous focus note"
            title="Previous note (Arrow Left)"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="carousel-counter-text" aria-live="polite">
            {currentSlide + 1} / {SLIDES.length}
          </span>
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handleNext}
            aria-label="Next focus note"
            title="Next note (Arrow Right)"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="focus-notes-content" role="group" aria-roledescription="slide" aria-label={`Slide ${currentSlide + 1} of ${SLIDES.length}`}>
        <div className="focus-slide-icon-box">
          <IconComponent size={28} className="slide-hero-icon" />
        </div>
        <div className="focus-slide-text">
          <h2 className="focus-slide-title">{activeSlideData.title}</h2>
          <p className="focus-slide-description">{activeSlideData.description}</p>
          <blockquote className="focus-slide-quote">
            {activeSlideData.quote}
            {activeSlideData.author && (
              <span className="quote-author"> — {activeSlideData.author}</span>
            )}
          </blockquote>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="focus-notes-indicators" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            className={`carousel-dot ${index === currentSlide ? 'carousel-dot-active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
