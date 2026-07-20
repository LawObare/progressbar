// src/App.jsx
import React, { useState } from 'react';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ name, email, password });
  };

  return (
    <div style={{
      padding: 'var(--space-6)',
      maxWidth: '600px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-2)'
      }}>
        Progress Bar
      </h1>
      <p style={{
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--space-6)'
      }}>
        Your developer operating system.
      </p>

      <h2 style={{
        fontSize: 'var(--font-size-lg)',
        marginBottom: 'var(--space-4)',
        color: 'var(--color-text-secondary)'
      }}>
        Input Examples
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-4)'
        }}>
          <Input
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter@example.com"
            required
            error={submitted && !email ? 'Email is required' : ''}
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={submitted && password.length < 6 ? 'Password must be at least 6 characters' : ''}
          />

          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-3)'
          }}>
            <Button type="submit" variant="primary">Submit</Button>
            <Button type="button" variant="ghost">Cancel</Button>
          </div>

          {submitted && !email && !password && (
            <div style={{
              padding: 'var(--space-3)',
              background: 'var(--color-danger)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)'
            }}>
              Please fill in all required fields.
            </div>
          )}
        </div>
      </form>

      <div style={{
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-subtle)'
      }}>
        <h3 style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          marginBottom: 'var(--space-2)'
        }}>
          Input Sizes
        </h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)'
        }}>
          <Input
            size="sm"
            placeholder="Small input"
            value=""
            onChange={() => {}}
          />
          <Input
            size="md"
            placeholder="Medium input (default)"
            value=""
            onChange={() => {}}
          />
          <Input
            size="lg"
            placeholder="Large input"
            value=""
            onChange={() => {}}
          />
          <Input
            disabled
            placeholder="Disabled input"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;