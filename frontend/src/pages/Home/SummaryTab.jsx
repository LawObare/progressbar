// src/pages/Home/SummaryTab.jsx
import React from 'react';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import styles from './SummaryTab.module.css';

export const SummaryTab = ({ data }) => {
  const { projects, learning, community } = data;

  // Calculate overall progress
  const allMilestones = projects.flatMap(p => p.milestones);
  const totalMilestones = allMilestones.length;
  const completedMilestones = allMilestones.filter(m => m.completed).length;
  const overallProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Calculate learning progress
  const totalModules = learning.reduce((sum, g) => sum + g.totalModules, 0);
  const completedModules = learning.reduce((sum, g) => sum + g.completedModules, 0);
  const learningProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Calculate community progress
  const postsTotal = community.posts.linkedin.target + community.posts.twitter.target + community.posts.devto.target;
  const postsCurrent = community.posts.linkedin.current + community.posts.twitter.current + community.posts.devto.current;
  const communityProgress = postsTotal > 0 ? Math.round((postsCurrent / postsTotal) * 100) : 0;

  return (
    <div className={styles.SummaryTab}>
      {/* Overall Progress */}
      <div className={styles.SummaryTab__overall}>
        <div className={styles.SummaryTab__overallHeader}>
          <span className={styles.SummaryTab__overallLabel}>Overall Progress</span>
          <span className={styles.SummaryTab__overallValue}>{overallProgress}%</span>
        </div>
        <div className={styles.SummaryTab__overallBar}>
          <div 
            className={styles.SummaryTab__overallFill} 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.SummaryTab__stats}>
        <div className={styles.SummaryTab__stat}>
          <span className={styles.SummaryTab__statValue}>{projects.length}</span>
          <span className={styles.SummaryTab__statLabel}>Projects</span>
        </div>
        <div className={styles.SummaryTab__stat}>
          <span className={styles.SummaryTab__statValue}>{completedMilestones}</span>
          <span className={styles.SummaryTab__statLabel}>Milestones Done</span>
        </div>
        <div className={styles.SummaryTab__stat}>
          <span className={styles.SummaryTab__statValue}>{learning.length}</span>
          <span className={styles.SummaryTab__statLabel}>Learning Goals</span>
        </div>
        <div className={styles.SummaryTab__stat}>
          <span className={styles.SummaryTab__statValue}>{community.oss.mergedPRs}</span>
          <span className={styles.SummaryTab__statLabel}>OSS PRs Merged</span>
        </div>
      </div>

      {/* Projects Section */}
      <section className={styles.SummaryTab__section}>
        <div className={styles.SummaryTab__sectionHeader}>
          <h2 className={styles.SummaryTab__sectionTitle}>Projects</h2>
          <Button variant="ghost" size="sm">View All →</Button>
        </div>
        <div className={styles.SummaryTab__itemList}>
          {projects.map((project) => {
            const done = project.milestones.filter(m => m.completed).length;
            const total = project.milestones.length;
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;
            const isDone = done === total && total > 0;

            return (
              <div key={project.id} className={styles.SummaryTab__item}>
                <div className={styles.SummaryTab__itemHeader}>
                  <span className={styles.SummaryTab__itemTitle}>{project.title}</span>
                  <span className={isDone ? styles['SummaryTab__itemStatus--done'] : styles['SummaryTab__itemStatus--active']}>
                    {isDone ? 'Done' : '→ Continue'}
                  </span>
                </div>
                <div className={styles.SummaryTab__itemProgress}>
                  <div className={styles.SummaryTab__itemBar}>
                    <div 
                      className={styles.SummaryTab__itemFill} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={styles.SummaryTab__itemProgressText}>
                    {done}/{total} milestones
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Section */}
      <section className={styles.SummaryTab__section}>
        <div className={styles.SummaryTab__sectionHeader}>
          <h2 className={styles.SummaryTab__sectionTitle}>Learning</h2>
          <Button variant="ghost" size="sm">View All →</Button>
        </div>
        <div className={styles.SummaryTab__itemList}>
          {learning.map((goal) => {
            const progress = goal.totalModules > 0 ? Math.round((goal.completedModules / goal.totalModules) * 100) : 0;
            const isDone = progress === 100;

            return (
              <div key={goal.id} className={styles.SummaryTab__item}>
                <div className={styles.SummaryTab__itemHeader}>
                  <span className={styles.SummaryTab__itemTitle}>{goal.title}</span>
                  <span className={isDone ? styles['SummaryTab__itemStatus--done'] : styles['SummaryTab__itemStatus--active']}>
                    {isDone ? 'Done' : '→ Continue'}
                  </span>
                </div>
                <div className={styles.SummaryTab__itemProgress}>
                  <div className={styles.SummaryTab__itemBar}>
                    <div 
                      className={styles.SummaryTab__itemFill} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={styles.SummaryTab__itemProgressText}>
                    {goal.completedModules}/{goal.totalModules} modules
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Section */}
      <section className={styles.SummaryTab__section}>
        <div className={styles.SummaryTab__sectionHeader}>
          <h2 className={styles.SummaryTab__sectionTitle}>Community</h2>
          <Button variant="ghost" size="sm">View All →</Button>
        </div>
        <div className={styles.SummaryTab__itemList}>
          <div className={styles.SummaryTab__item}>
            <div className={styles.SummaryTab__itemHeader}>
              <span className={styles.SummaryTab__itemTitle}>Social Posts</span>
              <span className={styles['SummaryTab__itemStatus--active']}>→ Continue</span>
            </div>
            <div className={styles.SummaryTab__itemProgress}>
              <div className={styles.SummaryTab__itemBar}>
                <div 
                  className={styles.SummaryTab__itemFill} 
                  style={{ width: `${communityProgress}%` }}
                />
              </div>
              <span className={styles.SummaryTab__itemProgressText}>
                {postsCurrent}/{postsTotal} posts
              </span>
            </div>
          </div>
          <div className={styles.SummaryTab__item}>
            <div className={styles.SummaryTab__itemHeader}>
              <span className={styles.SummaryTab__itemTitle}>Events Attended</span>
              <span className={styles['SummaryTab__itemStatus--done']}>Done</span>
            </div>
            <div className={styles.SummaryTab__itemProgress}>
              <div className={styles.SummaryTab__itemBar}>
                <div 
                  className={styles.SummaryTab__itemFill} 
                  style={{ width: '100%' }}
                />
              </div>
              <span className={styles.SummaryTab__itemProgressText}>
                {community.events.filter(e => e.attended).length}/{community.events.length} events
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};