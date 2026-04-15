import React, { useContext, useEffect } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { assets } from '../../assets/assets'

const WorkerAppointments = () => {

  const { dToken, appointments, getAppointments } = useContext(WorkerContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // ✅ Format Date like Doctor Panel
  const slotDateFormat = (date) => {
    if (!date) return ''

    const [day, month, year] = date.split('_')
    const newDate = new Date(`${year}-${month}-${day}`)

    return newDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>

        {/* Header */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>User</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Amount</p>
          <p>Action</p>
        </div>

        {/* Data */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
          >

            {/* Index */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* User */}
            <div className='flex items-center gap-2'>
              <img src={item.userData?.image} className='w-8 rounded-full' alt="" />
              <p>{item.userData?.name}</p>
            </div>

            {/* Payment */}
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>
              {item.userData?.dob
                ? new Date().getFullYear() - new Date(item.userData.dob).getFullYear()
                : 'N/A'}
            </p>

            {/* ✅ Date & Time FIXED */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Amount */}
            <p>₹{item.amount}</p>

            {/* ✅ Action Icons (UI only for now) */}
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-2'>
                      <img className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img className='w-8 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
            }

          </div>
        ))}

      </div>
    </div>
  )
}

export default WorkerAppointments