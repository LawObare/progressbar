import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <Card variant="default" padding="lg">
      <h1 className={styles.Login__title}>Sign In</h1>
      
      <form onSubmit={handleSubmit} className={styles.Login__form}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter@example.com"
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        
        <Button type="submit" variant="primary" size="md">
          Sign In
        </Button>
      </form>
      
      <p className={styles.Login__footer}>
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </Card>
  );
};
