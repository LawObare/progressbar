// src/components/Header/Header.jsx
import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  // Mock user for now
  const user = { name: 'Lawrence', campus: 'Zone 01 Kisumu' };

  return (
    <header className={styles.Header}>
      <div className={styles.Header__left}>
        <span className={styles.Header__brand}>Progress Bar</span>
      </div>
      
      <div className={styles.Header__right}>
        <span className={styles.Header__campus}>{user.campus}</span>
        <span className={styles.Header__user}>{user.name}</span>
      </div>
    </header>
  );
};