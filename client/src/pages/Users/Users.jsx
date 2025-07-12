import React, { useState } from 'react'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import User from './User'
import { useSelector } from "react-redux"
import './Users.css'
import Loader from "../../components/Loader/Loader"

const USERS_PER_PAGE = 20;

const Users = () => {
  const users = useSelector(state => state.usersReducer)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * USERS_PER_PAGE;
  const endIdx = startIdx + USERS_PER_PAGE;
  const currentUsers = users.slice(startIdx, endIdx);

  return (
    <div className='home-container-1'>
      <div className="home-container-2" style={{ marginTop: '30px' }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        {
          users.length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className='user-list-container'>
                {currentUsers.map(user => (
                  <User user={user} key={user?._id} />
                ))}
              </div>
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '32px 0 0 0', fontSize: '1.2rem', color: '#ccc' }}>
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ background: 'none', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', color: currentPage === 1 ? '#bbb' : 'var(--text-primary)', fontSize: '1.2rem' }}>&lt;</button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: currentPage === i + 1 ? 'var(--accent-color)' : 'var(--text-primary)',
                        fontWeight: currentPage === i + 1 ? 700 : 400,
                        fontSize: '1.2rem',
                        margin: '0 2px',
                        textDecoration: currentPage === i + 1 ? 'underline' : 'none',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ background: 'none', border: 'none', cursor: currentPage === totalPages ? 'default' : 'pointer', color: currentPage === totalPages ? '#bbb' : 'var(--text-primary)', fontSize: '1.2rem' }}>&gt;</button>
                </div>
              )}
            </>
          )
        }
        <RightSidebar />
      </div>
    </div>
  )
}

export default Users