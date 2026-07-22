// src/pages/Learning/Learning.jsx
import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Plus, 
  Link2, 
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { mockLearningGoals } from '../../mockData';
import styles from './Learning.module.css';

export const Learning = () => {
  const [goals, setGoals] = useState(mockLearningGoals);
  const [filter, setFilter] = useState('all');
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredGoals = goals.filter(g => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') return g.status === 'in-progress';
    if (filter === 'completed') return g.status === 'completed';
    return true;
  });

  const toggleGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'in-progress').length;

  return (
    <div className={styles.Learning}>
      {/* Stats strip */}
      <div className={styles.Learning__stats}>
        <div className={styles.Learning__stat}>
          <BookOpen className={styles.Learning__statIcon} size={20} />
          <span className={styles.Learning__statValue}>{totalGoals}</span>
          <span className={styles.Learning__statLabel}>Total Goals</span>
        </div>
        <div className={styles.Learning__stat}>
          <Clock className={styles.Learning__statIcon} size={20} />
          <span className={styles.Learning__statValue}>{inProgressGoals}</span>
          <span className={styles.Learning__statLabel}>In Progress</span>
        </div>
        <div className={styles.Learning__stat}>
          <CheckCircle className={styles.Learning__statIcon} size={20} />
          <span className={styles.Learning__statValue}>{completedGoals}</span>
          <span className={styles.Learning__statLabel}>Completed</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.Learning__toolbar}>
        <div className={styles.Learning__filters}>
          <button
            className={`${styles.Learning__filter} ${filter === 'all' ? styles['Learning__filter--active'] : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`${styles.Learning__filter} ${filter === 'in-progress' ? styles['Learning__filter--active'] : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`${styles.Learning__filter} ${filter === 'completed' ? styles['Learning__filter--active'] : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} />
          New Goal
        </Button>
      </div>

      {/* Learning goals list */}
      <div className={styles.Learning__list}>
        {filteredGoals.length === 0 ? (
          <div className={styles.Learning__empty}>
            <BookOpen size={48} className={styles.Learning__emptyIcon} />
            <p>No learning goals yet. Start your learning journey!</p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const progress = goal.totalModules > 0 
              ? Math.round((goal.completedModules / goal.totalModules) * 100) 
              : 0;
            const isExpanded = expandedGoal === goal.id;
            const isCompleted = goal.status === 'completed';

            return (
              <Card 
                key={goal.id} 
                variant="elevated" 
                className={`${styles.Learning__card} ${isExpanded ? styles['Learning__card--expanded'] : ''}`}
              >
                <div 
                  className={styles.Learning__cardHeader}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className={styles.Learning__cardInfo}>
                    <span className={styles.Learning__cardTitle}>{goal.title}</span>
                    <span className={styles.Learning__cardMeta}>
                      {goal.provider} · {goal.type}
                    </span>
                  </div>
                  <div className={styles.Learning__cardMeta}>
                    <span className={styles.Learning__cardProgress}>
                      {progress}%
                    </span>
                    <span className={styles.Learning__cardToggle}>
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  </div>
                </div>

                <div className={styles.Learning__cardBody}>
                  <div className={styles.Learning__cardProgressSection}>
                    <span className={styles.Learning__cardProgressText}>
                      {goal.completedModules}/{goal.totalModules} modules
                    </span>
                    <div className={styles.Learning__cardProgressBar}>
                      <div 
                        className={styles.Learning__cardProgressFill} 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  {isCompleted && (
                    <div className={styles.Learning__cardBadge}>
                      ✅ Completed
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className={styles.Learning__cardDetail}>
                    <div className={styles.Learning__detailSection}>
                      <h4 className={styles.Learning__detailTitle}>Key Takeaway</h4>
                      <p className={styles.Learning__detailText}>
                        {goal.keyTakeaway || 'No key takeaway recorded yet.'}
                      </p>
                    </div>
                    {goal.evidence && goal.evidence.length > 0 && (
                      <div className={styles.Learning__detailSection}>
                        <h4 className={styles.Learning__detailTitle}>Evidence</h4>
                        <div className={styles.Learning__evidenceList}>
                          {goal.evidence.map((item, index) => (
                            <span key={index} className={styles.Learning__evidenceItem}>
                              <Link2 size={14} />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Create Learning Goal Modal */}
      {showCreateModal && (
        <div className={styles.Learning__modalOverlay}>
          <div className={styles.Learning__modal}>
            <div className={styles.Learning__modalHeader}>
              <h2 className={styles.Learning__modalTitle}>New Learning Goal</h2>
              <button 
                className={styles.Learning__modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowCreateModal(false);
            }}>
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Title</label>
                <input 
                  className={styles.Learning__modalInput}
                  placeholder="What are you learning?"
                  required
                />
              </div>
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Provider</label>
                <input 
                  className={styles.Learning__modalInput}
                  placeholder="Course name, author, or platform"
                />
              </div>
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Type</label>
                <select className={styles.Learning__modalSelect}>
                  <option value="Course">Course</option>
                  <option value="Book">Book</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Self-Study">Self-Study</option>
                  <option value="Bootcamp">Bootcamp</option>
                </select>
              </div>
              <div className={styles.Learning__modalRow}>
                <div className={styles.Learning__modalField}>
                  <label className={styles.Learning__modalLabel}>Completed</label>
                  <input 
                    className={styles.Learning__modalInput}
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className={styles.Learning__modalField}>
                  <label className={styles.Learning__modalLabel}>Total</label>
                  <input 
                    className={styles.Learning__modalInput}
                    type="number"
                    placeholder="16"
                  />
                </div>
              </div>
              <div className={styles.Learning__modalActions}>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create Goal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
