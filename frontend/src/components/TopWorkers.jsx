import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopWorkers = () => {
    const navigate = useNavigate(); //this is use for the navigation
    const {workers} = useContext(AppContext); //we get workers

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Workers to Book</h1>
        <p className='sm:w-1/3 text-center text-sm' >Simply browse through our extensive list of trusted workers.</p>
        {/* now we want 10 workers from assets files*/}
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {workers.slice(0, 10).map((item, index) => (
                <div onClick={() => {navigate(`/booking/${item._id}`); scrollTo(0,0)}}  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='w-full h-48 object-cover bg-[#EAEFFF]' src={item.image} alt="" />{/* worker image 'object-cover use' */}
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                        <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={() => { navigate('/workers'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>

    </div>
  )
}

export default TopWorkers