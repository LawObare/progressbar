// src/pages/Projects/Projects.jsx
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { mockProjects } from '../../mockData';
import styles from './Projects.module.css';

export const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [expandedProject, setExpandedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalMilestones = projects.reduce((sum, p) => sum + p.milestones.length, 0);
  const completedProjects = projects.filter(p => 
    p.milestones.every(m => m.completed)
  ).length;

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => 
        filter === 'active' ? p.status === 'active' : p.status === 'completed'
      );

  const getDeadlineColor = (deadline) => {
    if (!deadline) return 'transparent';
    const now = new Date();
    const due = new Date(deadline);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return '#C8A098';
    if (daysLeft <= 2) return '#E4C0B8';
    if (daysLeft <= 4) return '#E8D0C8';
    if (daysLeft <= 7) return '#ECDED8';
    if (daysLeft <= 10) return '#F0E8E4';
    return 'transparent';
  };

  return (
    <div className={styles.Projects}>
      {/* Stats strip */}
      <div className={styles.Projects__stats}>
        <div className={styles.Projects__stat}>
          <span className={styles.Projects__statValue}>{activeProjects}</span>
          <span className={styles.Projects__statLabel}>Active</span>
        </div>
        <div className={styles.Projects__stat}>
          <span className={styles.Projects__statValue}>{totalMilestones}</span>
          <span className={styles.Projects__statLabel}>Milestones</span>
        </div>
        <div className={styles.Projects__stat}>
          <span className={styles.Projects__statValue}>{completedProjects}</span>
          <span className={styles.Projects__statLabel}>Completed</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.Projects__toolbar}>
        <div className={styles.Projects__filters}>
          <button
            className={`${styles.Projects__filter} ${filter === 'all' ? styles['Projects__filter--active'] : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`${styles.Projects__filter} ${filter === 'active' ? styles['Projects__filter--active'] : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`${styles.Projects__filter} ${filter === 'completed' ? styles['Projects__filter--active'] : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          + New Project
        </Button>
      </div>

      {/* Project list */}
      <div className={styles.Projects__list}>
        {filteredProjects.length === 0 ? (
          <div className={styles.Projects__empty}>
            <p>No projects yet. Create your first project!</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const total = project.milestones.length;
            const done = project.milestones.filter(m => m.completed).length;
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;
            const isExpanded = expandedProject === project.id;

            return (
              <Card 
                key={project.id} 
                variant="elevated" 
                className={`${styles.Projects__card} ${isExpanded ? styles['Projects__card--expanded'] : ''}`}
                style={{
                  borderLeft: `4px solid ${getDeadlineColor(project.deadline)}`,
                }}
              >
                <div 
                  className={styles.Projects__cardHeader}
                  onClick={() => toggleProject(project.id)}
                >
                  <div className={styles.Projects__cardInfo}>
                    <span className={styles.Projects__cardTitle}>{project.title}</span>
                    <span className={styles.Projects__cardDeadline}>
                      {project.deadline ? `Due ${new Date(project.deadline).toLocaleDateString()}` : 'No deadline'}
                    </span>
                  </div>
                  <div className={styles.Projects__cardMeta}>
                    <span className={styles.Projects__cardProgress}>
                      {progress}%
                    </span>
                    <span className={styles.Projects__cardToggle}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                <div className={styles.Projects__cardBody}>
                  {project.tags && project.tags.length > 0 && (
                    <div className={styles.Projects__cardTags}>
                      {project.tags.map(tag => (
                        <span key={tag} className={styles.Projects__cardTag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <p className={styles.Projects__cardDescription}>{project.description}</p>
                  <div className={styles.Projects__cardProgressBar}>
                    <div 
                      className={styles.Projects__cardProgressFill} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className={styles.Projects__cardDetail}>
                    <div className={styles.Projects__milestones}>
                      <h4 className={styles.Projects__milestonesTitle}>Milestones</h4>
                      {project.milestones.map((milestone) => {
                        const taskTotal = milestone.tasks.length;
                        const taskDone = milestone.tasks.filter(t => t.completed).length;
                        const taskProgress = taskTotal > 0 ? Math.round((taskDone / taskTotal) * 100) : 0;

                        return (
                          <div key={milestone.id} className={styles.Projects__milestone}>
                            <div className={styles.Projects__milestoneHeader}>
                              <span className={styles.Projects__milestoneTitle}>
                                {milestone.completed ? '✓' : '○'} {milestone.title}
                              </span>
                              <span className={styles.Projects__milestoneProgress}>
                                {taskDone}/{taskTotal} tasks
                              </span>
                            </div>
                            <div className={styles.Projects__milestoneBar}>
                              <div 
                                className={styles.Projects__milestoneFill} 
                                style={{ width: `${taskProgress}%` }}
                              />
                            </div>
                            <ul className={styles.Projects__taskList}>
                              {milestone.tasks.map(task => (
                                <li key={task.id} className={styles.Projects__task}>
                                  <span className={task.completed ? styles['Projects__task--done'] : ''}>
                                    {task.title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {milestone.evidence && (
                              <div className={styles.Projects__evidence}>
                                <span className={styles.Projects__evidenceLabel}>🔗 Evidence: </span>
                                <a href={milestone.evidence} target="_blank" rel="noopener noreferrer">
                                  {milestone.evidence}
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className={styles.Projects__modalOverlay}>
          <div className={styles.Projects__modal}>
            <h2 className={styles.Projects__modalTitle}>Create Project</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowCreateModal(false);
            }}>
              <div className={styles.Projects__modalField}>
                <label className={styles.Projects__modalLabel}>Title</label>
                <input 
                  className={styles.Projects__modalInput}
                  placeholder="Project name..."
                  required
                />
              </div>
              <div className={styles.Projects__modalField}>
                <label className={styles.Projects__modalLabel}>Description</label>
                <textarea 
                  className={styles.Projects__modalTextarea}
                  placeholder="What are you building?"
                  rows={3}
                />
              </div>
              <div className={styles.Projects__modalRow}>
                <div className={styles.Projects__modalField}>
                  <label className={styles.Projects__modalLabel}>Deadline</label>
                  <input 
                    className={styles.Projects__modalInput}
                    type="date"
                  />
                </div>
                <div className={styles.Projects__modalField}>
                  <label className={styles.Projects__modalLabel}>Tags</label>
                  <input 
                    className={styles.Projects__modalInput}
                    placeholder="Personal, Client, etc."
                  />
                </div>
              </div>
              <div className={styles.Projects__modalActions}>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
