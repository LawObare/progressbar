import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  return (
    <div className={styles.AuthLayout}>
      <div className={styles.AuthLayout__container}>
        <div className={styles.AuthLayout__brand}>
          <span className={styles.AuthLayout__logo}>Progress Bar</span>
          <p className={styles.AuthLayout__tagline}>Your developer operating system.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
