// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  BookOpen, 
  Users, 
  Repeat, 
  Compass, 
  User,
  Settings 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/home', label: 'Home', icon: LayoutDashboard },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/learning', label: 'Learning', icon: BookOpen },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/routines', label: 'Routines', icon: Repeat },
  { path: '/my-why', label: 'My Why', icon: Compass },
  { path: '/profile', label: 'Profile', icon: User },
];

export const Sidebar = () => {
  return (
    <nav className={styles.Sidebar}>
      {/* ... */}
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                `${styles.Sidebar__link} ${isActive ? styles['Sidebar__link--active'] : ''}`
              }
            >
              <Icon size={18} />
              <span className={styles.Sidebar__linkText}>{item.label}</span>
            </NavLink>
          </li>
        );
      })}
      {/* ... */}
      <div className={styles.Sidebar__footer}>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `${styles.Sidebar__link} ${isActive ? styles['Sidebar__link--active'] : ''}`
          }
        >
          <Settings size={18} />
          <span className={styles.Sidebar__linkText}>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};
