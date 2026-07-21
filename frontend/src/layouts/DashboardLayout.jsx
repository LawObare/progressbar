// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = () => {
  return (
    <div className={styles.DashboardLayout}>
      <Sidebar />
      <Header />
      <main className={styles.DashboardLayout__main}>
        <Outlet />
      </main>
    </div>
  );
};