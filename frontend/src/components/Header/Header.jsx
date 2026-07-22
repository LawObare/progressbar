// src/components/Header/Header.jsx
import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  // Mock user for now
  const user = { name: 'Lawrence' };

  return (
    <header className={styles.Header}>
      <div className={styles.Header__left}>
        <div className={styles.Header__logo}>
          <img src="/logo (3).png" alt="Progress Bar" className={styles.Header__logoImg} />
        </div>
        <span className={styles.Header__brand}>Progress Bar</span>
      </div>
      
      <div className={styles.Header__right}>
        <span className={styles.Header__user}>{user.name}</span>
      </div>
    </header>
  );
};