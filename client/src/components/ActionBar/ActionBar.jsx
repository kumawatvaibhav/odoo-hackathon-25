import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './ActionBar.css';

const ActionBar = () => {
  const navigate = useNavigate();

  return (
    <div className="action-bar">
      <div className="action-bar-section left">
        <button className="ask-btn" onClick={() => navigate('/AskQuestion')}>
          Ask New question
        </button>
      </div>
      <div className="action-bar-section center">
        <div className="filter-group">
          <span>Newest</span>
          <span>Unanswered</span>
          <button>more ▼</button>
        </div>
      </div>
      <div className="action-bar-section right">
        <div className="search-group">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
};

export default ActionBar; 