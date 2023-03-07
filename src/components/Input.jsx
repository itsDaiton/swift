import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Input = () => {

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/map')
  }

  return (
    <div className='h-[93vh] bg-gradient'>
      <div className='flex justify-center'>
        <motion.p
          initial={{ 
            opacity: 0,
            y: 100 
          }}
          animate={{ 
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              type: 'tween',
              delay: 0.2,
              duration: 2,
              ease: 'easeOut'
            }
          }}
          className='text-white font-semibold font-poppins text-[64px] pt-[80px]'
        >
          Welcome to Swift, David.
        </motion.p>
      </div>
      <div className='flex justify-center pt-[80px]'>
        <motion.button
          type='submit'
          className={`glassmorphism text-[28px] text-white w-[10%] h-[70px] rounded-full shadow-xl font-poppins`}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={handleNavigate}
        >
          Begin
        </motion.button>
      </div>
    </div>
  )
}

export default Input
