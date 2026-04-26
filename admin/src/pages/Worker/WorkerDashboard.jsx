<<<<<<< HEAD
import React, { useContext, useEffect } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const WorkerDashboard = () => {

  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment
  } = useContext(WorkerContext)

  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>

      {/* 🔷 Top Cards */}
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold'>₹{dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold'>{dashData.appointments}</p>
            <p className='text-gray-400'>Bookings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold'>{dashData.patients}</p>
            <p className='text-gray-400'>Users</p>
          </div>
        </div>

      </div>

      {/* 🔷 Latest Bookings */}
      <div className='bg-white mt-10 rounded border'>

        <div className='flex items-center gap-2 px-4 py-4 border-b'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>

              {/* User Image */}
              <img className='rounded-full w-10' src={item.userData?.image} alt="" />

              {/* Info */}
              <div className='flex-1 text-sm'>
                <p className='font-medium'>{item.userData?.name}</p>
                <p className='text-gray-500'>
                  Booking on {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {/* Status / Actions */}
              {
                item.cancelled ? (
                  <p className='text-red-400 text-xs'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs'>Completed</p>
                ) : (
                  <div className='flex gap-2'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-8 cursor-pointer'
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-8 cursor-pointer'
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )
              }

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

=======
import React from 'react'

const WorkerDashboard = () => {
  return (
    <div>WorkerDashboard</div>
  )
}

>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
export default WorkerDashboard