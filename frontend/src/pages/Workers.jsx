<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Workers = () => {

  const{speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const [showFilter,setShowFilter] = useState(false) //for mobile view filter
  const navigate = useNavigate(); //use for navigate to doc 

  const{workers} = useContext(AppContext)


  const applyFilter = () => {
      if (speciality) {
        setFilterDoc(workers.filter(doc => doc.speciality?.toLowerCase().trim() === speciality.toLowerCase().trim())) //this check the speciality
      } else {
        setFilterDoc(workers)
      }
    }
  
    useEffect(() => {
      applyFilter()
    }, [workers, speciality])

  return (
    <div>
        <p className='text-gray-600'>Browse through the workers specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>see categories</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `}> {/* adding sm:flex so that in mobile view it hide and in desktop it show */}
            <p onClick={() => navigate('/workers')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? 'bg-[#E2E5FF] text-black' : ''}`}>All Workers</p>
            <p onClick={() => speciality === 'Mechanic' ? navigate('/workers') : navigate('/workers/Mechanic')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Mechanic' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Mechanic</p>
            <p onClick={() => speciality === 'Cleaner' ? navigate('/workers') : navigate('/workers/Cleaner')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Cleaner' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Cleaner</p>
            <p onClick={() => speciality === 'Plumber' ? navigate('/workers') : navigate('/workers/Plumber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Plumber' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Plumber</p>
            <p onClick={() => speciality === 'Electrician' ? navigate('/workers') : navigate('/workers/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Electrician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Electrician</p>
            <p onClick={() => speciality === 'Repair' ? navigate('/workers') : navigate('/workers/Repair')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Repair' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Repair</p>
            <p onClick={() => speciality === 'Outdoor' ? navigate('/workers') : navigate('/workers/Outdoor')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Outdoor' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Outdoor</p>
            <p onClick={() => speciality === 'Personal' ? navigate('/workers') : navigate('/workers/Personal')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Personal' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Personal</p>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>{/* adding css prop in img so that it not stretch */}
            {
              filterDoc.map((item, index) => (
                <div onClick={() => navigate(`/booking/${item._id}`)}  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='w-full h-48 object-cover bg-[#EAEFFF]' src={item.image} alt="" />{/* worker image 'object-cover use' */}
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                        <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))
            }
          </div>
        </div>
    </div>
  )
}

=======
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Workers = () => {

  const{speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const [showFilter,setShowFilter] = useState(false) //for mobile view filter
  const navigate = useNavigate(); //use for navigate to doc 

  const{workers} = useContext(AppContext)


  const applyFilter = () => {
      if (speciality) {
        setFilterDoc(workers.filter(doc => doc.speciality?.toLowerCase().trim() === speciality.toLowerCase().trim())) //this check the speciality
      } else {
        setFilterDoc(workers)
      }
    }
  
    useEffect(() => {
      applyFilter()
    }, [workers, speciality])

  return (
    <div>
        <p className='text-gray-600'>Browse through the workers specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>see categories</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `}> {/* adding sm:flex so that in mobile view it hide and in desktop it show */}
            <p onClick={() => navigate('/workers')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? 'bg-[#E2E5FF] text-black' : ''}`}>All Workers</p>
            <p onClick={() => speciality === 'Mechanic' ? navigate('/workers') : navigate('/workers/Mechanic')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Mechanic' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Mechanic</p>
            <p onClick={() => speciality === 'Cleaner' ? navigate('/workers') : navigate('/workers/Cleaner')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Cleaner' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Cleaner</p>
            <p onClick={() => speciality === 'Plumber' ? navigate('/workers') : navigate('/workers/Plumber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Plumber' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Plumber</p>
            <p onClick={() => speciality === 'Electrician' ? navigate('/workers') : navigate('/workers/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Electrician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Electrician</p>
            <p onClick={() => speciality === 'Repair' ? navigate('/workers') : navigate('/workers/Repair')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Repair' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Repair</p>
            <p onClick={() => speciality === 'Outdoor' ? navigate('/workers') : navigate('/workers/Outdoor')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Outdoor' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Outdoor</p>
            <p onClick={() => speciality === 'Personal' ? navigate('/workers') : navigate('/workers/Personal')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Personal' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Personal</p>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>{/* adding css prop in img so that it not stretch */}
            {
              filterDoc.map((item, index) => (
                <div onClick={() => navigate(`/booking/${item._id}`)}  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='w-full h-48 object-cover bg-[#EAEFFF]' src={item.image} alt="" />{/* worker image 'object-cover use' */}
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                        <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))
            }
          </div>
        </div>
    </div>
  )
}

>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
export default Workers