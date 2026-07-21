// src/pages/Home/FocusTab.jsx
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import styles from './FocusTab.module.css';

export const FocusTab = ({ tasks, routines, onTaskComplete, onTaskStuck, onTaskContinue, onRoutineToggle }) => {
  const [blocker, setBlocker] = useState('');
  const [stuckExpanded, setStuckExpanded] = useState(true);
  const [showStuckModal, setShowStuckModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stuckReason, setStuckReason] = useState('');

  // Separate active and stuck tasks
  const activeTasks = tasks.filter(t => !t.completed && !t.stuck);
  const stuckTasks = tasks.filter(t => !t.completed && t.stuck);
  const isStuckLimitReached = stuckTasks.length >= 8;

  const handleStuckClick = (task) => {
    if (isStuckLimitReached) {
      alert('You have reached the stuck limit (8/8). Please resolve a stuck task first.');
      return;
    }
    setSelectedTask(task);
    setStuckReason('');
    setShowStuckModal(true);
  };

  const handleConfirmStuck = () => {
    if (selectedTask && stuckReason.trim()) {
      onTaskStuck(selectedTask.id, stuckReason);
      setShowStuckModal(false);
      setSelectedTask(null);
      setStuckReason('');
    }
  };

  const handleContinueClick = (task) => {
    onTaskContinue(task.id);
  };

  const handleSubmitBlocker = (e) => {
    e.preventDefault();
    if (blocker.trim()) {
      console.log('Blocker submitted:', blocker);
      setBlocker('');
    }
  };

  return (
    <div className={styles.FocusTab}>
      {/* Task Queue */}
      <section className={styles.FocusTab__section}>
        <div className={styles.FocusTab__sectionHeader}>
          <h2 className={styles.FocusTab__sectionTitle}>Task Queue</h2>
          <span className={styles.FocusTab__taskCount}>
            {activeTasks.length} tasks · Stuck: {stuckTasks.length}/8
          </span>
        </div>

        {activeTasks.length === 0 ? (
          <div className={styles.FocusTab__empty}>
            <p>No active tasks. 🎉</p>
          </div>
        ) : (
          <ul className={styles.FocusTab__taskList}>
            {activeTasks.map((task) => (
              <li key={task.id} className={styles.FocusTab__taskItem}>
                <div className={styles.FocusTab__taskContent}>
                  <span className={styles.FocusTab__taskTitle}>{task.title}</span>
                  <div className={styles.FocusTab__taskMeta}>
                    <span className={styles.FocusTab__taskSource}>{task.source}</span>
                    {task.deadline && (
                      <span className={styles.FocusTab__taskDeadline}>
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.FocusTab__taskActions}>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    onClick={() => onTaskComplete(task.id)}
                  >
                    Complete
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleStuckClick(task)}
                    disabled={isStuckLimitReached}
                  >
                    Stuck
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Stuck Section */}
      {stuckTasks.length > 0 && (
        <section className={styles.FocusTab__section}>
          <div 
            className={styles.FocusTab__sectionHeader}
            onClick={() => setStuckExpanded(!stuckExpanded)}
            style={{ cursor: 'pointer' }}
          >
            <h2 className={styles.FocusTab__sectionTitle}>
              Stuck Tasks ({stuckTasks.length}/8)
            </h2>
            <span className={styles.FocusTab__expandToggle}>
              {stuckExpanded ? '▼' : '▶'}
            </span>
          </div>

          {stuckExpanded && (
            <ul className={styles.FocusTab__stuckList}>
              {stuckTasks.map((task) => (
                <li key={task.id} className={styles.FocusTab__stuckItem}>
                  <div className={styles.FocusTab__stuckContent}>
                    <span className={styles.FocusTab__taskTitle}>{task.title}</span>
                    <div className={styles.FocusTab__stuckMeta}>
                      <span className={styles.FocusTab__taskSource}>{task.source}</span>
                      <span className={styles.FocusTab__stuckReason}>
                        Reason: {task.stuckReason || 'No reason provided'}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    onClick={() => handleContinueClick(task)}
                  >
                    Continue
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Today's Routines */}
      <section className={styles.FocusTab__section}>
        <h2 className={styles.FocusTab__sectionTitle}>Today's Routines</h2>
        {routines.length === 0 ? (
          <div className={styles.FocusTab__empty}>
            <p>No routines for today.</p>
          </div>
        ) : (
          <ul className={styles.FocusTab__routineList}>
            {routines.map((routine) => (
              <li key={routine.id} className={styles.FocusTab__routineItem}>
                <label className={styles.FocusTab__routineLabel}>
                  <input
                    type="checkbox"
                    checked={routine.completed}
                    onChange={() => onRoutineToggle(routine.id)}
                    className={styles.FocusTab__routineCheckbox}
                  />
                  <span className={styles.FocusTab__routineTitle}>{routine.title}</span>
                </label>
                <div className={styles.FocusTab__routineMeta}>
                  <span>{routine.timeStart} - {routine.timeEnd}</span>
                  <span>
                    {routine.currentCount}/{routine.targetCount}
                  </span>
                </div>
                <div className={styles.FocusTab__routineProgress}>
                  <div 
                    className={styles.FocusTab__routineBar} 
                    style={{ 
                      width: `${(routine.currentCount / routine.targetCount) * 100}%` 
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Mentor Feedback (placeholder) */}
      <section className={styles.FocusTab__section}>
        <h2 className={styles.FocusTab__sectionTitle}>Mentor Feedback</h2>
        <Card variant="outlined" padding="md">
          <p className={styles.FocusTab__feedbackText}>
            Sarah (Bocal): "Great work on the Git module!"
          </p>
          <Button variant="ghost" size="sm">View All →</Button>
        </Card>
      </section>

      {/* Blockers Input */}
      <section className={styles.FocusTab__section}>
        <h2 className={styles.FocusTab__sectionTitle}>Blockers</h2>
        <form onSubmit={handleSubmitBlocker} className={styles.FocusTab__blockerForm}>
          <input
            type="text"
            placeholder="What's blocking you right now?"
            value={blocker}
            onChange={(e) => setBlocker(e.target.value)}
            className={styles.FocusTab__blockerInput}
          />
          <Button type="submit" variant="primary" size="sm">Submit</Button>
        </form>
      </section>

      {/* Stuck Modal */}
      {showStuckModal && selectedTask && (
        <div className={styles.FocusTab__modalOverlay}>
          <div className={styles.FocusTab__modal}>
            <h3 className={styles.FocusTab__modalTitle}>Why are you stuck?</h3>
            <textarea
              className={styles.FocusTab__modalTextarea}
              placeholder="Describe what's blocking you..."
              value={stuckReason}
              onChange={(e) => setStuckReason(e.target.value)}
              rows={3}
            />
            <div className={styles.FocusTab__modalActions}>
              <Button variant="secondary" onClick={() => setShowStuckModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmStuck}>
                Mark as Stuck
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};