import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const { progress } = useAppStore();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🕉️ Sanskrit Learning
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/word-analyzer" className="nav-link">
              📚 Word Analyzer
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              Progress
            </Link>
          </li>
        </ul>
        <div className="navbar-stats">
          <span className="stat">
            📚 {progress.lessonsCompleted.length} completed
          </span>
          <span className="stat">⭐ {progress.totalPoints} points</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
