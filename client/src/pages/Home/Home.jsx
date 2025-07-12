import React from 'react'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import '../../App.css'

const Home = ({ HomeMainbarComponent }) => {
  return (
    <div className='home-container-1'>
      <div className='home-container-2'>
        {HomeMainbarComponent ? HomeMainbarComponent : <HomeMainbar />}
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home