// src/pages/Home/Home.jsx
import React from 'react';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.Home}>
      <h1 className={styles.Home__title}>Good morning, Lawrence</h1>
      <p className={styles.Home__subtitle}>Welcome to your developer operating system.</p>
      
      <div className={styles.Home__placeholder}>
        <p>Focus and Summary tabs coming soon...</p>
      </div>
    </div>
  );
};