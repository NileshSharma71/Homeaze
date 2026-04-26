import React, { useContext, useEffect, useState } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'
import axios from 'axios'

const WorkerProfile = () => {

  const {
    dToken,
    profileData,
    setProfileData,
    getProfileData
  } = useContext(WorkerContext)

  const { currencySymbol, backendUrl } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  // ✅ Update Profile
  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/worker/update-profile',
        updateData,
        { headers: { dtoken: dToken } }   // ✅ correct header
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // ✅ Fetch Profile
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-5'>

      <div className='flex flex-col gap-4'>

        {/* Image */}
        <img
          className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
          src={profileData.image}
          alt=""
        />

        <div className='flex-1 border rounded-lg p-6 bg-white'>

          {/* Name */}
          <p className='text-3xl font-medium text-gray-700'>
            {profileData.name}
          </p>

          {/* Speciality */}
          <p className='text-gray-600 mt-1'>
            {profileData.speciality}
          </p>

          {/* About */}
          <div className='mt-3'>
            <p className='font-medium'>About:</p>

            {
              isEdit
                ? <textarea
                    className='w-full border p-2 mt-1'
                    rows={5}
                    value={profileData.about}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        about: e.target.value
                      }))
                    }
                  />
                : <p className='text-gray-600'>{profileData.about}</p>
            }
          </div>

          {/* Fees */}
          <p className='mt-4'>
            Fee(₹):
            {
              isEdit
                ? <input
                    type='number'
                    className='border ml-2 p-1'
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        fees: e.target.value
                      }))
                    }
                  />
                : <span className='ml-2'>
                    {currencySymbol}{profileData.fees}
                  </span>
            }
          </p>

          {/* Address */}
          <div className='mt-3'>
            <p>Address:</p>

            {
              isEdit
                ? (
                  <>
                    <input
                      type='text'
                      className='border p-1 w-full mt-1'
                      value={profileData.address?.line1}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value
                          }
                        }))
                      }
                    />
                    <input
                      type='text'
                      className='border p-1 w-full mt-1'
                      value={profileData.address?.line2}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value
                          }
                        }))
                      }
                    />
                  </>
                )
                : (
                  <p className='text-gray-600'>
                    {profileData.address?.line1} <br />
                    {profileData.address?.line2}
                  </p>
                )
            }
          </div>

          {/* Availability */}
          <div className='flex items-center gap-2 mt-3'>
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData(prev => ({
                  ...prev,
                  available: !prev.available
                }))
              }
            />
            <label>Available</label>
          </div>

          {/* Buttons */}
          {
            isEdit
              ? <button
                  onClick={updateProfile}
                  className='mt-5 px-4 py-2 bg-primary text-white rounded'
                >
                  Save
                </button>
              : <button
                  onClick={() => setIsEdit(true)}
                  className='mt-5 px-4 py-2 border rounded'
                >
                  Edit
                </button>
          }

        </div>
      </div>
    </div>
  )
}

export default WorkerProfile