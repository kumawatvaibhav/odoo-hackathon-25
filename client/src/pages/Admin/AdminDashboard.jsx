import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDashboardStats, fetchAllUsersForAdmin, updateUserRoleAction } from '../../actions/admin';
import Loader from '../../components/Loader/Loader';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Robust selector for currentUser
  const currentUser = useSelector(state =>
    state.currentUserReducer?.currentUser ||
    state.currentUserReducer?.result ||
    state.currentUserReducer
  );
  const adminState = useSelector(state => state.adminReducer) || {};
  const dashboardStats = adminState.dashboardStats || { stats: { totalUsers: 0, totalQuestions: 0, totalAnswers: 0 }, recentUsers: [], recentQuestions: [] };
  const allUsers = adminState.allUsers || [];
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
    dispatch(fetchDashboardStats());
    dispatch(fetchAllUsersForAdmin());
  }, [dispatch, currentUser, navigate]);

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRoleAction(userId, newRole));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return <Loader />;
  }

  return (
    <div className="admin-dashboard">
      
      <div className="admin-main-content">
        <div className="admin-container">
          
          {/* Header Section */}
          <div className="admin-header">
            <div className="admin-header-info">
              <h1>Admin Dashboard</h1>
              <p className="admin-subtitle">Manage your platform with ease</p>
            </div>
            
            <div className="admin-tabs">
              <button
                className={activeTab === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveTab('dashboard')}
              >
                Overview
              </button>
              <button
                className={activeTab === 'users' ? 'active' : ''}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            </div>
          </div>

          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {!dashboardStats ? (
                <div className="loading-container">
                  <Loader />
                </div>
              ) : (
                <>
                  {/* Stats Grid */}
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <h3>Total Users</h3>
                      <p className="stat-number">{dashboardStats.stats?.totalUsers ?? 0}</p>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3>Total Questions</h3>
                      <p className="stat-number">{dashboardStats.stats?.totalQuestions ?? 0}</p>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <h3>Total Answers</h3>
                      <p className="stat-number">{dashboardStats.stats?.totalAnswers ?? 0}</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="recent-sections">
                    
                    {/* Recent Users */}
                    <div className="recent-section">
                      <h2>Recent Users</h2>
                      <div className="recent-list">
                        {dashboardStats.recentUsers && dashboardStats.recentUsers.length > 0 ? (
                          dashboardStats.recentUsers.map(user => (
                            <div key={user._id} className="recent-item">
                              <div className="user-info">
                                <div className="user-avatar">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="question-info">
                                  <h4>{user.name}</h4>
                                  <p>{user.email}</p>
                                </div>
                                <span className={`role-badge ${user.role}`}>
                                  {user.role}
                                </span>
                              </div>
                              <div className="date">{formatDate(user.joinedON)}</div>
                            </div>
                          ))
                        ) : (
                          <p className="empty-state">No recent users found</p>
                        )}
                      </div>
                    </div>

                    {/* Recent Questions */}
                    <div className="recent-section">
                      <h2>Recent Questions</h2>
                      <div className="recent-list">
                        {dashboardStats.recentQuestions && dashboardStats.recentQuestions.length > 0 ? (
                          dashboardStats.recentQuestions.map(question => (
                            <div key={question._id} className="recent-item">
                              <div className="question-info">
                                <h4>{question.questionTitle}</h4>
                                <p>by {question.userPosted}</p>
                              </div>
                              <div className="date">{formatDate(question.askedOn)}</div>
                            </div>
                          ))
                        ) : (
                          <p className="empty-state">No recent questions found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Users Tab Content */}
          {activeTab === 'users' && (
            <div className="users-content">
              <div className="users-header">
                <h2>User Management</h2>
                <p className="users-subtitle">Manage user roles and permissions</p>
              </div>
              
              {(allUsers.length === 0) ? (
                <div className="loading-container">
                  <Loader />
                </div>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(user => (
                        <tr key={user._id}>
                          <td>
                            <div className="table-user-info">
                              <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="question-info">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{formatDate(user.joinedON)}</td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              className="role-select"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;