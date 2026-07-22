// src/pages/Home/FocusTab.jsx
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { mockEvents } from '../../mockData';
import styles from './FocusTab.module.css';

export const FocusTab = ({ tasks, routines, onTaskComplete, onTaskStuck, onTaskContinue, onRoutineToggle }) => {
  const [stuckExpanded, setStuckExpanded] = useState(true);
  const [showStuckModal, setShowStuckModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stuckReason, setStuckReason] = useState('');
  const [events] = useState(mockEvents);

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

  // Sort events by date (soonest first)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Get days until event
  const getDaysUntil = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diff = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    return diff;
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

      {/* Upcoming Events (NEW) */}
      <section className={styles.FocusTab__section}>
        <h2 className={styles.FocusTab__sectionTitle}>Upcoming Events</h2>
        {sortedEvents.length === 0 ? (
          <div className={styles.FocusTab__empty}>
            <p>No upcoming events.</p>
          </div>
        ) : (
          <ul className={styles.FocusTab__eventList}>
            {sortedEvents.map((event) => {
              const daysUntil = getDaysUntil(event.date);
              return (
                <li key={event.id} className={styles.FocusTab__eventItem}>
                  <div className={styles.FocusTab__eventContent}>
                    <span className={styles.FocusTab__eventTitle}>{event.title}</span>
                    <span className={styles.FocusTab__eventDate}>
                      {new Date(event.date).toLocaleDateString()}
                      {event.location && ` · ${event.location}`}
                    </span>
                  </div>
                  <span className={styles.FocusTab__eventDays}>
                    {daysUntil <= 0 ? 'Today!' : `In ${daysUntil} days`}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
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
