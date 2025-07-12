import React, { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import decode from "jwt-decode";

import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'

import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import bars from "../../assets/bars-solid.svg";
import { FiBell } from 'react-icons/fi';
import './Navbar.css'

const Navbar = ({ setIsOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state) => (state.currentUserReducer))

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    toast.success('Logged out successfully')
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  // eslint-disable-next-line
  }, [User?.token, dispatch])
  

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo" style={{display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none'}}>
          <img src="/favicon.png" alt="StackIt Favicon" style={{height: '48px', width: '48px', display: 'inline-block', verticalAlign: 'middle'}} />
          <span className="navbar-brand-text" style={{fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)', letterSpacing: '1px'}}>StackIt</span>
        </Link>
        <div className="navbar-right">
          <Link to="/" className="nav-item nav-links nav-home-special" style={{marginRight: '16px', fontWeight: 500, fontSize: '1.05rem', color: 'var(--text-primary)', textDecoration: 'none'}}>
            Home
          </Link>
          <button className="nav-item nav-links nav-notification-btn" style={{marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px'}} aria-label="Notifications">
            <FiBell className="bell-animate" style={{fontSize: '1.5rem', color: 'var(--text-primary)'}} />
          </button>
          {User === null ? (
            <Link to={'/Auth'} className='nav-item nav-links'>
              Log In
            </Link>
          ) : (
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Avatar
                backgroundColor="#47a4ff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="#fff"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{
                    color: "#fff", textDecoration: "none"
                  }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <span style={{fontWeight: 500, fontSize: '1.05rem', color: 'var(--text-primary)'}}>
                Hi, {User.result.name.split(' ')[0]}!
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
