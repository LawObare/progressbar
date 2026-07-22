// src/pages/Projects/Projects.jsx
import React, { useState } from 'react';
import { 
  FolderOpen, 
  CheckCircle, 
  Clock, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Tag,
  Link2,
  X,
  Search
} from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { mockProjects } from '../../mockData';
import styles from './Projects.module.css';

export const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [expandedProject, setExpandedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all unique tags
  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags || []))];

  // Filter projects
  const filteredProjects = projects.filter(p => {
    // Status filter
    const statusMatch = filter === 'all' ? true : p.status === filter;
    
    // Tag filter
    const tagMatch = tagFilter === 'all' ? true : (p.tags || []).includes(tagFilter);
    
    // Search filter (by title or description)
    const searchMatch = searchQuery.trim() === '' 
      ? true 
      : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && tagMatch && searchMatch;
  });

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalMilestones = projects.reduce((sum, p) => sum + p.milestones.length, 0);
  const completedProjects = projects.filter(p => 
    p.milestones.every(m => m.completed)
  ).length;

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

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
          <FolderOpen className={styles.Projects__statIcon} size={20} />
          <span className={styles.Projects__statValue}>{activeProjects}</span>
          <span className={styles.Projects__statLabel}>Active</span>
        </div>
        <div className={styles.Projects__stat}>
          <CheckCircle className={styles.Projects__statIcon} size={20} />
          <span className={styles.Projects__statValue}>{totalMilestones}</span>
          <span className={styles.Projects__statLabel}>Milestones</span>
        </div>
        <div className={styles.Projects__stat}>
          <Clock className={styles.Projects__statIcon} size={20} />
          <span className={styles.Projects__statValue}>{completedProjects}</span>
          <span className={styles.Projects__statLabel}>Completed</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.Projects__toolbar}>
        <div className={styles.Projects__search}>
          <Search size={16} className={styles.Projects__searchIcon} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.Projects__searchInput}
          />
          {searchQuery && (
            <button 
              className={styles.Projects__searchClear}
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.Projects__controls}>
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

          <div className={styles.Projects__tagDropdown}>
            <Tag size={14} className={styles.Projects__tagDropdownIcon} />
            <select
              className={styles.Projects__tagDropdownSelect}
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'All Tags' : tag}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            New Project
          </Button>
        </div>
      </div>

      {/* Project list */}
      <div className={styles.Projects__list}>
        {filteredProjects.length === 0 ? (
          <div className={styles.Projects__empty}>
            <FolderOpen size={48} className={styles.Projects__emptyIcon} />
            <p>No projects found matching your filters.</p>
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
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  </div>
                </div>

                <div className={styles.Projects__cardBody}>
                  {project.tags && project.tags.length > 0 && (
                    <div className={styles.Projects__cardTags}>
                      {project.tags.map(tag => (
                        <span key={tag} className={styles.Projects__cardTag}>
                          <Tag size={12} />
                          {tag}
                        </span>
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
                                {milestone.completed ? <CheckCircle size={14} /> : <Clock size={14} />}
                                {milestone.title}
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
                                    {task.completed ? '✓' : '○'} {task.title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {milestone.evidence && (
                              <div className={styles.Projects__evidence}>
                                <Link2 size={12} />
                                <span className={styles.Projects__evidenceLabel}>Evidence: </span>
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
            <div className={styles.Projects__modalHeader}>
              <h2 className={styles.Projects__modalTitle}>Create Project</h2>
              <button 
                className={styles.Projects__modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
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