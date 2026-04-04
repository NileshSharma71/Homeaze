import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedWorkers from '../components/RelatedWorkers'

const Booking = () => {

  const { workId } = useParams()
  const { workers, currencySymbol } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // fetch worker info
  const fetchDocInfo = () => {
    const info = workers.find(doc => doc._id === workId)
    setDocInfo(info)
  }

  // generate available slots
  const getAvailableSlots = () => {
    if (!docInfo) return

    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.toDateString() === currentDate.toDateString()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "" + month + "" + year

        const isSlotAvailable =
          !docInfo.slots_booked?.[slotDate]?.includes(formattedTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  // dummy booking handler (backend later)
  const bookAppointment = () => {
    if (!slotTime) {
      alert('Please select a time slot')
      return
    }
    console.log('Booked:', docInfo.name, slotIndex, slotTime)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [workers, workId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div>

      {/* worker details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img
            className='bg-primary w-full sm:max-w-72 rounded-lg'
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-600 mt-1'>
              {docInfo.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Booking fee:
            <span className='text-gray-800'> {currencySymbol}{docInfo.fees} </span>
            per hrs
          </p>
        </div>
      </div>

      {/* booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>

        <p>Booking slots</p>

        {/* days */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index)
                setSlotTime('')
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border border-[#DDDDDD]'
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* time slots */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? 'bg-primary text-white'
                  : 'text-[#949494] border border-[#B4B4B4]'
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'
        >
          Book an Service
        </button>

      </div>
          {/* listing related workers */}
          <RelatedWorkers workId={workId} speciality={docInfo.speciality}></RelatedWorkers>

    </div>
  )
}

export default Booking
