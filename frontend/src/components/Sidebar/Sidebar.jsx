// src/components/Sidebar/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/learning', label: 'Learning' },
  { path: '/community', label: 'Community' },
  { path: '/routines', label: 'Routines' },
  { path: '/my-why', label: 'My Why' },
  { path: '/profile', label: 'Profile' },
];

export const Sidebar = () => {
  return (
    <nav className={styles.Sidebar}>
      <ul className={styles.Sidebar__nav}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.Sidebar__item}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                `${styles.Sidebar__link} ${isActive ? styles['Sidebar__link--active'] : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      
      <div className={styles.Sidebar__footer}>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `${styles.Sidebar__link} ${isActive ? styles['Sidebar__link--active'] : ''}`
          }
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};
