// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { FocusTab } from './FocusTab';
import { mockTasks, mockRoutines } from '../../mockData';
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
      <header className={styles.Home__header}>
        <h1 className={styles.Home__title}>Good morning, Lawrence</h1>
        <p className={styles.Home__subtitle}>Welcome to your developer operating system.</p>
      </header>

      <div className={styles.Home__tabs}>
        <button
          className={`${styles.Home__tab} ${activeTab === 'focus' ? styles['Home__tab--active'] : ''}`}
          onClick={() => setActiveTab('focus')}
        >
          Focus
        </button>
        <button
          className={`${styles.Home__tab} ${activeTab === 'summary' ? styles['Home__tab--active'] : ''}`}
          onClick={() => setActiveTab('summary')}
        >
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
          <div className={styles.Home__placeholder}>
            <p>Summary tab coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};