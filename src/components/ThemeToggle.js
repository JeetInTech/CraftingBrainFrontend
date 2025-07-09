// src/components/ThemeToggle.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className={`theme-toggle-btn ${theme}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <span className="toggle-icon">
              {isDark ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
        <span className="toggle-label">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;