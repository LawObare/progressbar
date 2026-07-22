// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { Target, LayoutGrid } from 'lucide-react'; // ← Add these imports
import { FocusTab } from './FocusTab';
import { SummaryTab } from './SummaryTab';
import { mockTasks, mockRoutines, mockSummaryData } from '../../mockData';
import styles from './Home.module.css';

export const Home = () => {
  const [activeTab, setActiveTab] = useState('focus');
  const [tasks, setTasks] = useState(mockTasks);
  const [routines, setRoutines] = useState(mockRoutines);

  const handleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));
  };

  const handleTaskStuck = (taskId, reason) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, stuck: true, stuckReason: reason } : t
    ));
  };

  const handleTaskContinue = (taskId) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, stuck: false, stuckReason: '' } : t
    ));
  };

  const handleRoutineToggle = (routineId) => {
    setRoutines(prev => prev.map(r => 
      r.id === routineId ? { ...r, completed: !r.completed } : r
    ));
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Home__tabs}>
        <button
          className={`${styles.Home__tab} ${activeTab === 'focus' ? styles['Home__tab--active'] : ''}`}
          onClick={() => setActiveTab('focus')}
        >
          <Target size={16} />
          Focus
        </button>
        <button
          className={`${styles.Home__tab} ${activeTab === 'summary' ? styles['Home__tab--active'] : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <LayoutGrid size={16} />
          Summary
        </button>
      </div>

      <div className={styles.Home__content}>
        {activeTab === 'focus' && (
          <FocusTab
            tasks={tasks}
            routines={routines}
            onTaskComplete={handleTaskComplete}
            onTaskStuck={handleTaskStuck}
            onTaskContinue={handleTaskContinue}
            onRoutineToggle={handleRoutineToggle}
          />
        )}
        {activeTab === 'summary' && (
          <SummaryTab data={mockSummaryData} />
        )}
      </div>
    </div>
  );
};
