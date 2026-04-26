import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/Appcontext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      {/* Cards */}
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition-all'>
          <img className='w-14' src={assets.worker_icon} alt="" />
          <div>
            <p className='text-xl font-semibold'>{dashData.doctors}</p>
            <p className='text-gray-400'>Workers</p>
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

      {/* Latest Bookings */}
      <div className='bg-white mt-10 rounded border'>

        <div className='flex items-center gap-2 px-4 py-4 border-b'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>

              <img className='rounded-full w-10' src={item.docData?.image} alt="" />

              <div className='flex-1 text-sm'>
                <p className='font-medium'>{item.docData?.name}</p>
                <p className='text-gray-500'>
                  Booking on {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {item.cancelled ? (
                <p className='text-red-400 text-xs'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-8 cursor-pointer'
                  src={assets.cancel_icon}
                  alt=""
                />
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Dashboard