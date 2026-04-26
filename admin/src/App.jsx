import React , {useContext} from 'react'
import Login from './pages/Login'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddWorker from './pages/Admin/AddWorker';
import WorkersList from './pages/Admin/WorkersList';
import { WorkerContext } from './context/WorkerContext';
import WorkerAppointments from './pages/Worker/WorkerAppointments';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import WorkerProfile from './pages/Worker/WorkerProfile';


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(WorkerContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-bookings' element={<AllBookings />} />
          <Route path='/add-worker' element={<AddWorker />} />
          <Route path='/worker-list' element={<WorkersList />} />

          {/* worker route */}
          <Route path='/worker-dashboard' element={<WorkerDashboard />} />
          <Route path='/worker-appointments' element={<WorkerAppointments />} />
          <Route path='/worker-profile' element={<WorkerProfile />} />
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App