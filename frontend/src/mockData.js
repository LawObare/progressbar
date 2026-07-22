// src/mockData.js

// Mock tasks for the task queue
export const mockTasks = [
  {
    id: 'task-1',
    title: 'Finish Git module',
    source: 'Project',
    sourceType: 'project',
    deadline: '2026-07-23',
    priority: 'high',
    completed: false,
    stuck: false,
    stuckReason: '',
  },
  {
    id: 'task-2',
    title: 'Write LinkedIn post',
    source: 'Routine',
    sourceType: 'routine',
    deadline: '2026-07-21',
    priority: 'medium',
    completed: false,
    stuck: false,
    stuckReason: '',
  },
  // ... more tasks
];

// Mock routines for "Today's Routines"
export const mockRoutines = [
  {
    id: 'routine-1',
    title: 'Daily Coding Practice',
    frequency: 'daily',
    timeStart: '09:00',
    timeEnd: '10:00',
    completed: true,
    currentCount: 30,
    targetCount: 30,
  },
  // ... more routines
];

// Summary data — aggregated from all categories
export const mockSummaryData = {
  projects: [
    {
      id: 'project-1',
      title: 'Progress-Bar',
      description: 'A tool that will help developers keep up with their busy schedule',
      deadline: '2026-10-20',
      tags: ['Personal'],
      milestones: [
        { id: 'm1', title: 'UI/UX', completed: true, total: 4, done: 4 },
        { id: 'm2', title: 'Development', completed: false, total: 3, done: 0 },
      ],
    },
    {
      id: 'project-2',
      title: 'Zone 01 Portfolio',
      description: 'Personal portfolio website for Zone 01',
      deadline: '2026-08-15',
      tags: ['Personal', 'Portfolio'],
      milestones: [
        { id: 'm3', title: 'Design', completed: false, total: 3, done: 1 },
        { id: 'm4', title: 'Development', completed: false, total: 3, done: 1 },
      ],
    },
  ],
  learning: [
    {
      id: 'goal-1',
      title: 'Learn React',
      provider: 'React Full Course (Udemy)',
      type: 'Course',
      totalModules: 16,
      completedModules: 12,
      keyTakeaway: 'useEffect dependencies matter.',
      evidence: ['GitHub Repo', 'Certificate'],
    },
    {
      id: 'goal-2',
      title: 'Learn SQL',
      provider: 'SQL for Devs (YouTube)',
      type: 'Tutorial',
      totalModules: 12,
      completedModules: 3,
      keyTakeaway: 'JOINs are still confusing.',
      evidence: [],
    },
  ],
  community: {
    posts: {
      linkedin: { target: 4, current: 2 },
      twitter: { target: 4, current: 2 },
      devto: { target: 1, current: 1 },
    },
    events: [
      { id: 'e1', title: 'GDG Meetup', date: '2026-05-25', attended: true },
      { id: 'e2', title: 'Hackathon', date: '2026-06-05', attended: false },
    ],
    oss: {
      totalPRs: 5,
      mergedPRs: 3,
      routineCompleted: true,
    },
  },
};

// src/mockData.js

// Mock projects
export const mockProjects = [
  {
    id: 'project-1',
    title: 'Progress-Bar',
    description: 'A tool that will help developers keep up with their busy schedule',
    deadline: '2026-10-20',
    tags: ['Personal'],
    status: 'active',
    milestones: [
      {
        id: 'm1',
        title: 'UI/UX Design',
        description: 'Design the user interface and experience',
        completed: true,
        tasks: [
          { id: 't1', title: 'Design UI in Figma', completed: true },
          { id: 't2', title: 'Get students\' views', completed: true },
          { id: 't3', title: 'Create directory structure', completed: true },
          { id: 't4', title: 'Research on Vite', completed: true },
        ],
        evidence: 'https://figma.com/design/...',
      },
      {
        id: 'm2',
        title: 'Development',
        description: 'Build the application',
        completed: false,
        tasks: [
          { id: 't5', title: 'Set up Vite + React', completed: false },
          { id: 't6', title: 'Build component library', completed: false },
          { id: 't7', title: 'Implement routing', completed: false },
        ],
        evidence: null,
      },
      {
        id: 'm3',
        title: 'Deployment',
        description: 'Deploy the application',
        completed: false,
        tasks: [
          { id: 't8', title: 'Deploy to Vercel', completed: false },
          { id: 't9', title: 'Set up custom domain', completed: false },
        ],
        evidence: null,
      },
    ],
  },
  {
    id: 'project-2',
    title: 'Zone 01 Portfolio',
    description: 'Personal portfolio website for Zone 01',
    deadline: '2026-08-15',
    tags: ['Personal', 'Portfolio'],
    status: 'active',
    milestones: [
      {
        id: 'm4',
        title: 'Design',
        description: 'Design the portfolio layout',
        completed: false,
        tasks: [
          { id: 't10', title: 'Design wireframes', completed: true },
          { id: 't11', title: 'Design in Figma', completed: false },
          { id: 't12', title: 'Get feedback', completed: false },
        ],
        evidence: null,
      },
      {
        id: 'm5',
        title: 'Development',
        description: 'Build the portfolio',
        completed: false,
        tasks: [
          { id: 't13', title: 'Set up project', completed: true },
          { id: 't14', title: 'Build components', completed: false },
          { id: 't15', title: 'Add animations', completed: false },
        ],
        evidence: null,
      },
    ],
  },
];

export const mockEvents = [
  {
    id: 'event-1',
    title: 'GDG Meetup',
    description: 'Google Developer Group meetup',
    date: '2026-05-25',
    location: 'Kisumu, Kenya',
    type: 'meetup',
  },
  {
    id: 'event-2',
    title: 'Hackathon 2026',
    description: 'Annual hackathon',
    date: '2026-06-05',
    location: 'Online',
    type: 'hackathon',
  },
  {
    id: 'event-3',
    title: 'Portfolio Deadline',
    description: 'Submit portfolio for review',
    date: '2026-06-15',
    location: null,
    type: 'deadline',
  },
];

// src/mockData.js

// ... existing mock data ...

// Mock learning goals
export const mockLearningGoals = [
  {
    id: 'goal-1',
    title: 'Learn React',
    provider: 'React Full Course (Udemy)',
    type: 'Course',
    totalModules: 16,
    completedModules: 12,
    keyTakeaway: 'useEffect dependencies matter.',
    evidence: ['GitHub Repo', 'Certificate'],
    status: 'in-progress',
  },
  {
    id: 'goal-2',
    title: 'Learn SQL',
    provider: 'SQL for Devs (YouTube)',
    type: 'Tutorial',
    totalModules: 12,
    completedModules: 3,
    keyTakeaway: 'JOINs are still confusing.',
    evidence: [],
    status: 'in-progress',
  },
  {
    id: 'goal-3',
    title: 'Master Go Programming',
    provider: 'Go by Example',
    type: 'Book',
    totalModules: 10,
    completedModules: 10,
    keyTakeaway: 'Interfaces are powerful.',
    evidence: ['Certificate'],
    status: 'completed',
  },
];