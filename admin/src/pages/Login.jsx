import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { WorkerContext } from '../context/WorkerContext'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {

  const [state, setState] = useState("Admin")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(WorkerContext)

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Admin') {

        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        );

        if (data.success) {
          setAToken(data.token);
          localStorage.setItem('aToken', data.token);
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message);
        }

      } else {

        const { data } = await axios.post(
          backendUrl + '/api/worker/login',
          { email, password }
        );

        if (data.success) {
          setDToken(data.token);
          localStorage.setItem('dToken', data.token);
          navigate('/worker-dashboard')
        } else {
          toast.error(data.message);
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Google login handler for Worker
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/worker/google-login',
        { credential: credentialResponse.credential }
      );

      if (data.success) {
        setDToken(data.token);
        localStorage.setItem('dToken', data.token);
        toast.success("Google login successful!");
        navigate('/worker-dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

        {/* Google Login - Only for Worker */}
        {state === 'Worker' && (
          <>
            <div className='flex items-center gap-3 w-full my-1'>
              <hr className='flex-1 border-gray-300' />
              <span className='text-gray-400 text-xs'>OR</span>
              <hr className='flex-1 border-gray-300' />
            </div>
            <div className='w-full flex justify-center'>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google login failed')}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>
          </>
        )}

        {
          state === "Admin"
            ? <p>Worker Login? <span onClick={() => setState('Worker')} className='text-primary underline cursor-pointer'>Click Here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login