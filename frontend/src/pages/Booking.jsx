import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedWorkers from '../components/RelatedWorkers'
import axios from 'axios'
import { toast } from 'react-toastify'

const Booking = () => {

  const { workId } = useParams()

  const {
    workers,
    currencySymbol,
    backendUrl,
    token,
    getWorkersData
  } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const navigate = useNavigate()

  // fetch worker details
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
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        )
        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        )
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

        const slotDate = day + "_" + month + "_" + year

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

  // book appointment
  const bookAppointment = async () => {

    if (!token) {
      toast.warning('Login to book service')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warning('Select a time slot')
    }

    if (!docSlots[slotIndex]?.length) {
      return toast.error('No slots available')
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId: workId,  
          slotDate,
          slotTime
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getWorkersData()   
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // useEffects
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
        <img
          className='bg-primary w-full sm:max-w-72 rounded-lg'
          src={docInfo.image}
          alt=""
        />

        <div className='flex-1 border rounded-lg p-8 bg-white'>
          <p className='text-3xl font-medium flex items-center gap-2'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <p className='text-gray-600 mt-1'>
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className='mt-3 text-sm'>{docInfo.about}</p>

          <p className='mt-4'>
            Fee: {currencySymbol}{docInfo.fees} per hrs
          </p>
        </div>
      </div>

      {/* slots */}
      <div className='mt-8'>

        {/* days */}
        <div className='flex gap-3 overflow-x-scroll'>
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index)
                setSlotTime('')
              }}
              className={`p-4 rounded-full cursor-pointer ${
                slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border'
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* times */}
        <div className='flex gap-3 mt-4 overflow-x-scroll'>
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? 'bg-primary text-white'
                  : 'border'
              }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className='bg-primary text-white px-6 py-3 rounded-full mt-6'
        >
          Book Service
        </button>

      </div>

      <RelatedWorkers
        workId={workId}
        speciality={docInfo.speciality}
      />
    </div>
  )
}

export default Booking