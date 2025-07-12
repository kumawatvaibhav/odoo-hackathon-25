import { Link } from 'react-router-dom'
import './Users.css'
import Avatar from '../../components/Avatar/Avatar'

const User = ({ user }) => {
  return (
    <Link to={`/Users/${user._id}`} className='user-profile-link'>
      <Avatar backgroundColor="#47a4ff" color="#fff" px="13px" py="10px" borderRadius="50%" fontSize="1.5rem">
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <h5>{user.name}</h5>
    </Link>
  )
}

export default User