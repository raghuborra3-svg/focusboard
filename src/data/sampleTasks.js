/**
 * FocusBoard Initial Sample Tasks
 * Minimum 6 sample tasks with varied categories, statuses, priorities, and deadlines.
 */
export const INITIAL_TASKS = [
  {
    id: "TASK-101",
    title: "Design System Tokens & Component Library",
    description: "Establish semantic color palettes, typography scales, spacing tokens, and button variants in Figma for FocusBoard 2.0.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-25",
    createdAt: "2026-11-20T09:00:00.000Z"
  },
  {
    id: "TASK-102",
    title: "Refactor Authentication Flow & Token Storage",
    description: "Audit refresh token rotation strategy, implement secure session storage handling, and update password recovery screens.",
    category: "Development",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-28",
    createdAt: "2026-11-20T10:30:00.000Z"
  },
  {
    id: "TASK-103",
    title: "Implement Three-Slide Focus Notes Carousel",
    description: "Build an interactive carousel component with circular navigation, keyboard arrow support, and active dot indicator states.",
    category: "Development",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-22",
    createdAt: "2026-11-19T14:15:00.000Z"
  },
  {
    id: "TASK-104",
    title: "Conduct Mobile Usability & Touch Target Testing",
    description: "Evaluate 390px viewport performance, verify 44px touch targets on iOS Safari and Chrome Android, and optimize drawer transitions.",
    category: "Testing",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-26",
    createdAt: "2026-11-21T11:00:00.000Z"
  },
  {
    id: "TASK-105",
    title: "User Research & Persona Synthesis for Sprint 4",
    description: "Analyze 8 customer discovery interviews, synthesize recurring pain points in task organization, and outline priority user stories.",
    category: "Research",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-21",
    createdAt: "2026-11-18T16:45:00.000Z"
  },
  {
    id: "TASK-106",
    title: "Configure CI/CD Pipeline & Automated Test Runner",
    description: "Set up GitHub Actions workflow for pull request linting, Vite production builds, and bundle size performance monitoring.",
    category: "DevOps",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-30",
    createdAt: "2026-11-21T13:20:00.000Z"
  }
];

export const CATEGORIES = [
  "All Categories",
  "Design",
  "Development",
  "Testing",
  "Research",
  "DevOps"
];

export const STATUS_OPTIONS = [
  "To do",
  "In progress",
  "Completed"
];

export const PRIORITY_OPTIONS = [
  "Low",
  "Medium",
  "High"
];
