# FocusBoard · Task Management & Focus Dashboard

> A high-performance, mobile-first task management dashboard built with React.js, Vite, and modern CSS custom properties. Designed to empower individuals and teams to organize tasks, maintain daily momentum, and achieve deep focus.

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

**FocusBoard** is a modern task management dashboard engineered according to rigorous visual specifications and responsive requirements (Desktop 1440px, Tablet 768px, Mobile 390px). It combines dynamic workspace metrics, interactive focus methodology prompts, flexible task search/filtering, and persistent state management without relying on heavy third-party state libraries or external backend dependencies.

---

## 🚀 Key Features

### 1. Dynamic Dashboard Statistics
- **Total Tasks**: Real-time count of all tasks in the workspace.
- **In Progress**: Dynamic count of active sprint tasks (`status === 'In progress'`).
- **Completed**: Count of delivered tasks (`status === 'Completed'`).
- **Completion Rate (%)**: Calculated automatically using:
  $$\text{Completion Rate} = \left(\frac{\text{Completed Tasks}}{\text{Total Tasks}}\right) \times 100$$
  Includes a visual progress indicator and safe zero-division handling (`0%` when task list is empty).

### 2. Focus Notes Carousel (3 Interactive Slides)
- **Mandatory 3-Slide Carousel** featuring high-impact productivity methodologies:
  1. *Slide 1: Plan Your Day with Intention* (Stephen Covey principle)
  2. *Slide 2: Deep Work & Single-Task Execution* (Cal Newport protocol)
  3. *Slide 3: Reflect, Calibrate & Celebrate* (Daily velocity & review)
- **Controls & Interactions**:
  - Previous (`<`) and Next (`>`) buttons with circular wrapping.
  - Active indicator dots allowing direct slide jumping.
  - Keyboard accessibility (Arrow Left / Arrow Right).

### 3. Full Task CRUD Operations
- **Create Task**: Responsive modal dialog (`TaskForm.jsx`) with live form validation for task title, category, status, priority, and due date.
- **Edit Task**: Reusable modal that pre-populates existing task data, preserving unique task IDs.
- **Delete Task**: Accessible confirmation dialog (`DeleteConfirmModal.jsx`) preventing accidental data loss.
- **Inline Status Switcher**: Quick status selector right on the task card to effortlessly transition tasks between `To do`, `In progress`, and `Completed`.

### 4. Search, Multi-Factor Filters & Sorting
- **Real-Time Search**: Case-insensitive instant filtering by task title and description with an instant clear button.
- **Status Tabs**: Segmented status switcher (`All`, `To do`, `In progress`, `Completed`) displaying live task counts for each status.
- **Priority Filter**: Filter tasks by `High`, `Medium`, or `Low`.
- **Category Filter**: Filter tasks across `Design`, `Development`, `Testing`, `Research`, and `DevOps`.
- **Sort Options**: Sort by Due Date (Earliest / Latest), Priority (High to Low), or Title (A to Z).
- **Reset Filters**: One-click reset button when active filters or searches yield filtered results.

### 5. Browser Data Persistence (`localStorage`)
- Backed by the custom `useLocalStorage` React hook.
- Automatically stores tasks under the key `focusboard_tasks`.
- Safely parses JSON with fallback to 6 comprehensive default sample tasks on fresh launch.
- Provides a "Reset Demo" button in the header for testing and evaluator inspection.

### 6. Mobile-First Responsive Design (1440px / 768px / 390px)
- **Desktop (1440 × 1000)**: Two-column layout with fixed navigation sidebar, 4-column metric grid, carousel banner, and 2-column task grid.
- **Tablet (768px)**: 2-column statistics grid, responsive drawer sidebar, reflowed filter rows.
- **Mobile (390 × 1128)**: Off-canvas slide-out navigation drawer with touch overlay, stacked 1-column cards, touch targets $\ge 44\text{px}$, and bottom-sheet form dialogs.

### 7. Accessibility (a11y) & Usability
- Semantic HTML5 structure (`<header>`, `<main>`, `<aside>`, `<nav>`, `<section>`, `<article>`).
- ARIA roles and labels (`role="tab"`, `role="dialog"`, `aria-roledescription="carousel"`, `aria-selected`).
- Visible focus outlines (`:focus-visible`) for keyboard navigability.
- Color contrast exceeding WCAG AA standards.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18.3** | Component-based UI and reactive lifecycle |
| **Vite 6.0** | Ultra-fast build tool and development server |
| **JavaScript (ES6+)** | Core application logic and data manipulation |
| **CSS3 & Custom Properties** | Responsive layouts, grid/flexbox, animations, and design tokens |
| **Lucide React** | Lightweight, accessible SVG iconography |
| **localStorage API** | Client-side persistent data storage |

---

## 📁 Project Folder Structure

```text
focusboard/
│
├── public/
│   └── (Static public assets)
│
├── src/
│   ├── assets/
│   │   └── (Icons and illustrations)
│   │
│   ├── components/
│   │   ├── Sidebar.jsx              # Responsive navigation & focus momentum
│   │   ├── Header.jsx               # Top header, date, search, and CTA
│   │   ├── StatCard.jsx             # Reusable metric card with progress bar
│   │   ├── FocusNotes.jsx           # 3-slide interactive focus carousel
│   │   ├── SearchBar.jsx            # Case-insensitive title/keyword search
│   │   ├── FilterTabs.jsx           # Status tabs, priority & category filters
│   │   ├── TaskCard.jsx             # Task card with badges and quick status
│   │   ├── TaskList.jsx             # Grid/List switcher and empty states
│   │   ├── TaskForm.jsx             # Create / Edit modal with validation
│   │   └── DeleteConfirmModal.jsx   # Safe deletion confirmation dialog
│   │
│   ├── data/
│   │   └── sampleTasks.js           # 6 diverse initial sample tasks
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js       # Reusable browser storage hook
│   │
│   ├── App.jsx                      # Root container, state orchestrator
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Design tokens & responsive styles
│
├── index.html                       # HTML5 template with typography links
├── vite.config.js                   # Vite configuration
├── package.json                     # Project dependencies & scripts
├── README.md                        # Project documentation
├── AI_USAGE.md                      # AI tool transparency disclosure
└── .gitignore                       # Git ignore definitions
```

---

## 🧠 State Management Architecture

The application adopts a **single source of truth** approach using native React Hooks (`useState`, `useMemo`, `useEffect`) combined with the custom `useLocalStorage` hook:

1. **Task State & Synchronization**:
   - The master task list resides in `App.jsx` managed by `useLocalStorage('focusboard_tasks', INITIAL_TASKS)`.
   - Any CRUD event (creating a task, updating fields, deleting an item, or switching status) triggers an immutable state update, automatically serializing the latest state to `localStorage`.
2. **Derived Computations with `useMemo`**:
   - **Metrics & Statistics**: The total count, in-progress count, completed count, and completion rate are never stored redundantly. They are derived directly from the task list using `useMemo`, ensuring instantaneous recalculation upon any state modification.
   - **Filtered & Sorted Dataset**: Tasks are filtered in memory by combining search keywords, status tabs, priority options, and category filters simultaneously, followed by multi-field sorting.
3. **Form Reusability**:
   - `TaskForm.jsx` accepts an optional `taskToEdit` prop. When present, the form mounts in "Edit Mode" and preserves the unique `id`; when null, it initializes clean defaults in "Create Mode" and generates a new unique ID.

---

## 💾 LocalStorage Implementation

- **Storage Key**: `focusboard_tasks`
- **Error Handling**: Wrapped in `try...catch` blocks to protect against quota exhaustion, browser incognito restrictions, or malformed JSON.
- **Initial Hydration**: If valid task data exists in `localStorage`, it is parsed and hydrated into React state. If no record is found or the data is corrupt, the system falls back to `INITIAL_TASKS` (6 diverse records across Design, Development, Testing, Research, and DevOps).
- **Reset Mechanism**: A `resetTasksToDefault` function allows developers and evaluators to clear modified storage and restore original mock data instantly.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/focusboard.git
   cd focusboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` (or the URL displayed in the terminal).

### Production Build & Preview
To verify the production bundle:
```bash
npm run build
npm run preview
```

---

## 🧪 Testing Checklist Verification

| Requirement | Test Scenario | Result |
| :--- | :--- | :---: |
| **Initial Data** | Loads $\ge 6$ diverse sample tasks on initial visit | ✅ Passed |
| **Create Task** | Adds new task with required field validation | ✅ Passed |
| **Edit Task** | Modifies title, priority, due date, preserves ID | ✅ Passed |
| **Delete Task** | Confirmation modal prompts before deletion | ✅ Passed |
| **Status Update** | Changes status inline (`To do` $\rightarrow$ `In progress` $\rightarrow$ `Completed`) | ✅ Passed |
| **Statistics** | Total, In Progress, Completed & Completion % dynamically update | ✅ Passed |
| **Carousel** | 3 slides navigate circularly with indicators & keyboard | ✅ Passed |
| **Search** | Case-insensitive title and keyword search with clear button | ✅ Passed |
| **Filters** | Combined status tabs and priority/category filtering | ✅ Passed |
| **Persistence** | Data changes survive page reload | ✅ Passed |
| **Responsive** | Verified at 1440px (Desktop), 768px (Tablet), 390px (Mobile) | ✅ Passed |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
