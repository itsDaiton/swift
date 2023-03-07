import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Error = () => {

  const [user, loading] = useAuthState(auth)

  let navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="bg-gradient h-screen w-screen flex flex-col justify-center items-center">
      <div className='glassmorphism text-white font-poppins py-10 flex flex-col justify-center items-center space-y-8 w-1/3'>
        <h4 className='text-[96px] font-bold'>404</h4>
        <p className='text-[36px] font-semibold'>Page Not Found</p>
        <p className='text-[20px]'>The page you're looking for was not found.</p>
      </div>
      <div className='flex text-white font-poppins py-5 px-5 my-10 text-[20px]'>
        <motion.button
          type='button'
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          className='glassmorphism text-[28px] text-white py-5 px-5 rounded-full shadow-xl font-poppins'
          onClick={handleNavigate}
        >
          Go back
        </motion.button>
      </div>
    </div>
  )
}

export default Error
