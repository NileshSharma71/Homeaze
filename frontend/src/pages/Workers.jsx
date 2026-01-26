import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Workers = () => {

  const{speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate(); //use for navigate to doc

  const{workers} = useContext(AppContext)


  const applyFilter = () => {
      if (speciality) {
        setFilterDoc(workers.filter(doc => doc.speciality?.toLowerCase().trim() === speciality.toLowerCase().trim()))
      } else {
        setFilterDoc(workers)
      }
    }
  
    useEffect(() => {
      applyFilter()
    }, [workers, speciality])

  return (
    <div>
        <p>Browse through the workers specialist.</p>
        <div>
          <div>
            <p>Mechanic</p>
            <p>Cleaner</p>
            <p>Plumber</p>
            <p>Electrician</p>
            <p>Repair</p>
            <p>Outdoor</p>
            <p>Personal</p>
          </div>
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
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

export default Workers