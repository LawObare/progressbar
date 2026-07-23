// src/pages/Routines/Routines.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Repeat, 
  Plus, 
  Clock, 
  CheckCircle, 
  Play, 
  Pause, 
  Square,
  X
} from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { mockRoutines } from '../../mockData';
import styles from './Routines.module.css';

export const Routines = () => {
  const [routines, setRoutines] = useState(mockRoutines);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [timerState, setTimerState] = useState('idle'); // idle, running, paused, break
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalSessions, setTotalSessions] = useState(8);
  const intervalRef = useRef(null);

  // Toggle routine completion
  const toggleRoutine = (routineId) => {
    setRoutines(prev => prev.map(r => 
      r.id === routineId ? { ...r, completed: !r.completed } : r
    ));
  };

  // Timer controls
  const startTimer = () => {
    if (timerState === 'idle' || timerState === 'paused') {
      setTimerState('running');
    }
  };

  const pauseTimer = () => {
    setTimerState('paused');
  };

  const stopTimer = () => {
    setTimerState('idle');
    setTimerMinutes(25);
    setTimerSeconds(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startBreak = () => {
    setTimerState('break');
    setTimerMinutes(5);
    setTimerSeconds(0);
  };

  // Timer countdown logic
  useEffect(() => {
    if (timerState === 'running' || timerState === 'break') {
      intervalRef.current = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            // Session complete
            if (timerState === 'running') {
              setSessionsCompleted(prev => prev + 1);
              setTimerState('idle');
              setTimerMinutes(25);
              setTimerSeconds(0);
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              // Notify user
              alert('🎉 Work session complete! Take a break.');
            } else if (timerState === 'break') {
              setTimerState('idle');
              setTimerMinutes(25);
              setTimerSeconds(0);
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              alert('☕ Break complete! Ready to focus again.');
            }
          } else {
            setTimerMinutes(prev => prev - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(prev => prev - 1);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState, timerMinutes, timerSeconds]);

  // Format time display
  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={styles.Routines}>
      {/* Pomodoro Timer */}
      <section className={styles.Routines__section}>
        <h2 className={styles.Routines__sectionTitle}>Focus Timer</h2>
        <Card variant="elevated" className={styles.Routines__timerCard}>
          <div className={styles.Routines__timerDisplay}>
            <span className={styles.Routines__timerTime}>
              {formatTime(timerMinutes, timerSeconds)}
            </span>
            <span className={styles.Routines__timerLabel}>
              {timerState === 'break' ? 'Break Session' : 'Work Session'}
            </span>
          </div>
          <div className={styles.Routines__timerControls}>
            {timerState === 'idle' && (
              <>
                <Button variant="primary" onClick={startTimer}>
                  <Play size={16} /> Start
                </Button>
                <Button variant="ghost" onClick={() => {
                  setTimerMinutes(25);
                  setTimerSeconds(0);
                }}>
                  Reset
                </Button>
              </>
            )}
            {timerState === 'running' && (
              <>
                <Button variant="secondary" onClick={pauseTimer}>
                  <Pause size={16} /> Pause
                </Button>
                <Button variant="ghost" onClick={stopTimer}>
                  <Square size={16} /> Stop
                </Button>
              </>
            )}
            {timerState === 'paused' && (
              <>
                <Button variant="primary" onClick={startTimer}>
                  <Play size={16} /> Resume
                </Button>
                <Button variant="ghost" onClick={stopTimer}>
                  <Square size={16} /> Stop
                </Button>
              </>
            )}
            {timerState === 'break' && (
              <Button variant="secondary" onClick={stopTimer}>
                Skip Break
              </Button>
            )}
          </div>
          <div className={styles.Routines__timerStats}>
            <span>Today: {sessionsCompleted} sessions completed</span>
            <span>This week: {totalSessions} sessions completed</span>
          </div>
        </Card>
      </section>

      {/* Routines List */}
      <section className={styles.Routines__section}>
        <div className={styles.Routines__sectionHeader}>
          <h2 className={styles.Routines__sectionTitle}>Active Routines</h2>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> New Routine
          </Button>
        </div>

        {routines.length === 0 ? (
          <div className={styles.Routines__empty}>
            <Repeat size={48} className={styles.Routines__emptyIcon} />
            <p>No routines yet. Build your daily habits!</p>
          </div>
        ) : (
          <div className={styles.Routines__list}>
            {routines.map((routine) => {
              const progress = routine.targetCount > 0 
                ? Math.round((routine.currentCount / routine.targetCount) * 100) 
                : 0;
              const isDone = routine.completed;

              return (
                <Card key={routine.id} variant="default" className={styles.Routines__routineCard}>
                  <div className={styles.Routines__routineHeader}>
                    <label className={styles.Routines__routineLabel}>
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleRoutine(routine.id)}
                        className={styles.Routines__routineCheckbox}
                      />
                      <span className={styles.Routines__routineTitle}>
                        {isDone ? '■' : '□'} {routine.title}
                      </span>
                    </label>
                    <span className={styles.Routines__routineProgress}>
                      {routine.currentCount}/{routine.targetCount}
                    </span>
                  </div>
                  <div className={styles.Routines__routineMeta}>
                    <span className={styles.Routines__routineFrequency}>
                      {routine.frequency === 'daily' ? 'Every day' : 
                       routine.frequency === 'weekly' ? `Every ${routine.dayOfWeek}` : 
                       `Every ${routine.dayOfMonth}`}
                    </span>
                    {routine.timeStart && routine.timeEnd && (
                      <span>
                        {routine.timeStart} - {routine.timeEnd}
                      </span>
                    )}
                  </div>
                  <div className={styles.Routines__routineProgressBar}>
                    <div 
                      className={styles.Routines__routineProgressFill} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* New Routine Modal */}
      {showCreateModal && (
        <div className={styles.Routines__modalOverlay}>
          <div className={styles.Routines__modal}>
            <div className={styles.Routines__modalHeader}>
              <h2 className={styles.Routines__modalTitle}>New Routine</h2>
              <button 
                className={styles.Routines__modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowCreateModal(false);
            }}>
              <div className={styles.Routines__modalField}>
                <label className={styles.Routines__modalLabel}>Title</label>
                <input 
                  className={styles.Routines__modalInput}
                  placeholder="Routine name..."
                  required
                />
              </div>
              <div className={styles.Routines__modalField}>
                <label className={styles.Routines__modalLabel}>Frequency</label>
                <select className={styles.Routines__modalSelect}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className={styles.Routines__modalRow}>
                <div className={styles.Routines__modalField}>
                  <label className={styles.Routines__modalLabel}>Start Time</label>
                  <input 
                    className={styles.Routines__modalInput}
                    type="time"
                    defaultValue="09:00"
                  />
                </div>
                <div className={styles.Routines__modalField}>
                  <label className={styles.Routines__modalLabel}>End Time</label>
                  <input 
                    className={styles.Routines__modalInput}
                    type="time"
                    defaultValue="10:00"
                  />
                </div>
              </div>
              <div className={styles.Routines__modalRow}>
                <div className={styles.Routines__modalField}>
                  <label className={styles.Routines__modalLabel}>Target Count</label>
                  <input 
                    className={styles.Routines__modalInput}
                    type="number"
                    placeholder="e.g., 4"
                  />
                </div>
                <div className={styles.Routines__modalField}>
                  <label className={styles.Routines__modalLabel}>Category</label>
                  <select className={styles.Routines__modalSelect}>
                    <option value="coding">Coding</option>
                    <option value="social">Social</option>
                    <option value="oss">Open Source</option>
                    <option value="learning">Learning</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>
              <div className={styles.Routines__modalActions}>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create Routine
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
