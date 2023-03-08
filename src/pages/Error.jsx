import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Error = () => {

  let navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="bg-gradient h-screen w-screen flex flex-col justify-center items-center">
      <div className='glassmorphism text-white font-poppins py-10 flex flex-col justify-center items-center space-y-8 lg:w-1/3 md:1/2 text-center'>
        <h4 className='lg:text-[96px] md:text-[64px] sm:text-[48px] text-[32px] font-bold'>404</h4>
        <p className='lg:text-[36px] md:text-[28px] sm:text-[18px] text-[16px] font-semibold'>Page Not Found</p>
        <p className='lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] px-5'>The page you're looking for was not found.</p>
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
          className='glassmorphism lg:text-[28px] md:text-[24px] sm:text-[20px] text-[18px] text-white
          py-5 px-5 rounded-full shadow-xl font-poppins'
          onClick={handleNavigate}
        >
          Go back
        </motion.button>
      </div>
    </div>
  )
}

export default Error
