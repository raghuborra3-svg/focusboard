# AI Usage Disclosure

In compliance with the assignment evaluation guidelines, this document outlines how AI assistance was utilized during the development of **FocusBoard**.

---

## 🛠️ Tools Used
- **Antigravity AI Assistant** (Google DeepMind)

---

## 💬 Representative Prompts

1. *"Help architect the component hierarchy for FocusBoard adhering strictly to the required desktop (1440px), tablet (768px), and mobile (390px) responsive viewports."*
2. *"Provide a clean implementation of a custom `useLocalStorage` React hook with safe JSON error handling and fallback hydration for initial task records."*
3. *"Design the state flow for derived dashboard metrics (Total Tasks, In Progress, Completed, Completion Rate %) to guarantee dynamic recalculation on any CRUD operation without state desynchronization."*
4. *"Create a 3-slide Focus Notes carousel component supporting circular navigation, active dot indicators, and keyboard accessibility."*

---

## 💡 AI-Assisted Areas
- **Component Decomposition**: Defining clear, modular component boundaries (`Sidebar`, `Header`, `StatCard`, `FocusNotes`, `TaskList`, `TaskCard`, `TaskForm`, `DeleteConfirmModal`).
- **Responsive CSS Layouts**: Crafting modern CSS custom properties and mobile-first media queries for the off-canvas drawer navigation and 390px stacked view.
- **Accessibility & ARIA**: Implementing keyboard navigation for the 3-slide carousel (`ArrowLeft` / `ArrowRight`), modal focus trapping, and semantic HTML tags.

---

## 🔍 Verified, Corrected or Rejected Suggestions

### 1. External State Management (Rejected)
- **Initial Suggestion**: The AI suggested using Redux Toolkit or Zustand for global task state management across the dashboard and modals.
- **Review & Decision**: Rejected. Per the assignment specifications, unnecessary third-party libraries should be avoided for a single-page dashboard. Native React Hooks (`useState`, `useMemo`, `useEffect`) and a custom `useLocalStorage` hook provide cleaner architecture, zero bundle bloat, and full transparency.

### 2. Auto-Playing Carousel (Corrected)
- **Initial Suggestion**: The AI drafted an automatic timer (`setInterval`) to advance the Focus Notes carousel every 5 seconds.
- **Review & Decision**: Corrected. The assignment guidelines explicitly noted: *"Automatic carousel rotation is not required. Manual previous/next navigation is sufficient."* Auto-advancing can also impair readability and accessibility for users reviewing focus methodologies. Replaced with clean manual controls and clickable dot indicators.

### 3. Destruction Confirmation Safety (Modified)
- **Initial Suggestion**: Standard browser `window.confirm()` for task deletion.
- **Review & Decision**: Modified to build a dedicated, accessible `DeleteConfirmModal` component matching the Figma design system, featuring the task ID and title, warning icon, and clear destructive action styling.
