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