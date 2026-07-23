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
  ChevronRight,
  Tag
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

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    sourceType: 'Course',
    sourceName: '',
    progressType: 'Lessons',
    completed: 0,
    total: 0,
    frequency: '3 per Week',
    targetDate: '',
    tags: [],
    tagInput: '',
  });

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

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag addition
  const handleAddTag = () => {
    const tag = formData.tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: '',
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove),
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: formData.title,
      sourceType: formData.sourceType,
      sourceName: formData.sourceName,
      progressType: formData.progressType,
      completed: parseInt(formData.completed) || 0,
      total: parseInt(formData.total) || 0,
      frequency: formData.frequency,
      targetDate: formData.targetDate || null,
      tags: formData.tags,
      keyTakeaway: '',
      evidence: [],
      status: 'in-progress',
    };
    setGoals(prev => [newGoal, ...prev]);
    setShowCreateModal(false);
    // Reset form
    setFormData({
      title: '',
      sourceType: 'Course',
      sourceName: '',
      progressType: 'Lessons',
      completed: 0,
      total: 0,
      frequency: '3 per Week',
      targetDate: '',
      tags: [],
      tagInput: '',
    });
  };

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
            const progress = goal.total > 0 
              ? Math.round((goal.completed / goal.total) * 100) 
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
                      {goal.sourceType} · {goal.sourceName || 'No source'}
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
                      {goal.completed}/{goal.total} {goal.progressType}
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

                <div className={styles.Learning__cardFooter}>
                  {goal.tags && goal.tags.length > 0 && (
                    <div className={styles.Learning__cardTags}>
                      {goal.tags.map(tag => (
                        <span key={tag} className={styles.Learning__cardTag}>
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className={styles.Learning__cardFrequency}>
                    {goal.frequency} · {goal.targetDate ? `Target: ${new Date(goal.targetDate).toLocaleDateString()}` : 'No target'}
                  </span>
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
              <h2 className={styles.Learning__modalTitle}>Create Learning Goal</h2>
              <button 
                className={styles.Learning__modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Title</label>
                <input 
                  className={styles.Learning__modalInput}
                  name="title"
                  placeholder="e.g. Learn Go"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Source Type */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Source Type</label>
                <select 
                  className={styles.Learning__modalSelect}
                  name="sourceType"
                  value={formData.sourceType}
                  onChange={handleFormChange}
                >
                  <option value="Course">Course</option>
                  <option value="Book">Book</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Self-Study">Self-Study</option>
                  <option value="Bootcamp">Bootcamp</option>
                </select>
              </div>

              {/* Source Name */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Source Name (Optional)</label>
                <input 
                  className={styles.Learning__modalInput}
                  name="sourceName"
                  placeholder="e.g. Let's Go"
                  value={formData.sourceName}
                  onChange={handleFormChange}
                />
              </div>

              {/* Progress Type */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Progress Type</label>
                <select 
                  className={styles.Learning__modalSelect}
                  name="progressType"
                  value={formData.progressType}
                  onChange={handleFormChange}
                >
                  <option value="Lessons">Lessons</option>
                  <option value="Chapters">Chapters</option>
                  <option value="Videos">Videos</option>
                  <option value="Exercises">Exercises</option>
                  <option value="Sections">Sections</option>
                </select>
              </div>

              {/* Completed / Total */}
              <div className={styles.Learning__modalRow}>
                <div className={styles.Learning__modalField}>
                  <label className={styles.Learning__modalLabel}>Completed</label>
                  <input 
                    className={styles.Learning__modalInput}
                    type="number"
                    name="completed"
                    placeholder="0"
                    value={formData.completed}
                    onChange={handleFormChange}
                    min="0"
                  />
                </div>
                <div className={styles.Learning__modalField}>
                  <label className={styles.Learning__modalLabel}>Total</label>
                  <input 
                    className={styles.Learning__modalInput}
                    type="number"
                    name="total"
                    placeholder="e.g. 20"
                    value={formData.total}
                    onChange={handleFormChange}
                    min="1"
                  />
                </div>
              </div>

              {/* Study Frequency */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Study Frequency</label>
                <select 
                  className={styles.Learning__modalSelect}
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleFormChange}
                >
                  <option value="1 per Week">1 per Week</option>
                  <option value="2 per Week">2 per Week</option>
                  <option value="3 per Week">3 per Week</option>
                  <option value="4 per Week">4 per Week</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>

              {/* Target Date */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Target Date (Optional)</label>
                <input 
                  className={styles.Learning__modalInput}
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleFormChange}
                />
              </div>

              {/* Tags */}
              <div className={styles.Learning__modalField}>
                <label className={styles.Learning__modalLabel}>Tags</label>
                <div className={styles.Learning__modalTagContainer}>
                  {formData.tags.map(tag => (
                    <span key={tag} className={styles.Learning__modalTag}>
                      {tag}
                      <button 
                        type="button"
                        className={styles.Learning__modalTagRemove}
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <div className={styles.Learning__modalTagInputWrapper}>
                    <input 
                      className={styles.Learning__modalInput}
                      placeholder="Add tag..."
                      value={formData.tagInput}
                      onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm"
                      onClick={handleAddTag}
                    >
                      + Add
                    </Button>
                  </div>
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
