// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Projects } from './pages/Projects/Projects';
import { Learning } from './pages/Learning/Learning';
import { Community } from './pages/Community/Community';
import { Routines } from './pages/Routines/Routines';
import { MyWhy } from './pages/MyWhy/MyWhy';
import { Profile } from './pages/Profile/Profile';
import { Settings } from './pages/Settings/Settings';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (no sidebar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Route>
        
        {/* Dashboard Routes (with sidebar) */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/community" element={<Community />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/my-why" element={<MyWhy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;