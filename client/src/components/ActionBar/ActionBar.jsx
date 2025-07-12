import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiChevronDown } from 'react-icons/fi';
import './ActionBar.css';

const FILTER_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Unanswered', value: 'unanswered' },
  { label: 'Most Answered', value: 'most_answered' },
  { label: 'Recent', value: 'recent' },
];

const ActionBar = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('newest');
  const dropdownRef = useRef(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsFilterDropdownOpen(false);
    if (onFilterChange) onFilterChange(value);
  };

  return (
    <div className="action-bar">
      <div className="action-bar-section left">
        <button className="ask-btn" onClick={() => navigate('/AskQuestion')}>
          Ask New question
        </button>
      </div>
      <div className="action-bar-section center">
        <div className="filter-group" ref={filterDropdownRef}>
          <button className="filter-btn" onClick={() => setIsFilterDropdownOpen(v => !v)}>
            {FILTER_OPTIONS.find(opt => opt.value === filter).label} <FiChevronDown style={{marginLeft: 4}} />
          </button>
          {isFilterDropdownOpen && (
            <div className="filter-dropdown">
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`filter-dropdown-item${filter === opt.value ? ' selected' : ''}`}
                  onClick={() => handleFilterSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="action-bar-section right">
        <div className="search-group">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="dropdown-container" ref={dropdownRef}>
          <button className="menu-btn" onClick={toggleDropdown}>
            <FiMenu className="menu-icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button 
                className="dropdown-item"
                onClick={() => handleMenuClick('/Tags')}
              >
                Tags
              </button>
              <button 
                className="dropdown-item"
                onClick={() => handleMenuClick('/Users')}
              >
                Users
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionBar; 