import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workers' element={<Workers />} />
        <Route path='/workers/:speciality' element={<Workers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/booking/:workId' element={<Booking />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/my-profile' element={<MyProfile />} />
      </Routes>
    </div>
  )
}

export default App