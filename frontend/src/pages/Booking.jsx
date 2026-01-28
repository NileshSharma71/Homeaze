import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'


const Booking = () => {

  const {workId} = useParams() // use workId parameter
  const {workers, currencySymbol} = useContext(AppContext)

  const[docInfo, setDocInfo] = useState(null)

  const fetchDocInfo = async() => {
    const docInfo = workers.find((doc) => doc._id === workId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }

  useEffect(()=>{
    fetchDocInfo()
  },[workers,workId])


  return docInfo && (
    <div>
        {/* workers details */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>

          <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* doc info : name, degree, experience */}
            <p className='flex items-center gap-2 text-3xl font-medium text-gray-900'>
              {docInfo.name}
              <img className='w-5' src={assets.verified_icon} alt="" />
            </p>
            <div  className='flex items-center gap-2 mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            {/* worker about */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img src={assets.info_icon} alt="" /></p>
              <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-600 font-medium mt-4'>
              Booking fee: <span  className='text-gray-800'>{docInfo.fees}</span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Booking