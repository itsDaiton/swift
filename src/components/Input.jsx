import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const Input = () => {

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const handleNavigate = () => {
    if (user) {
      navigate('/map')
    }
    else {
      navigate('/login')
    }
  }

  const getFirstName = (name) => {
    let parts = name.split(' ')
    return parts[0]
  }

  if (loading) {
    return <div className='bg-gradient h-screen text-white'>Loading...</div>
  }

  return (
    <div className='h-[93vh] bg-gradient text-center'>
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
          className='text-white font-semibold font-poppins lg:text-[96px] md:text-[64px] sm:text-[48px] text-[28px] pt-[80px] px-10'
        >
          Welcome to Swift{(user && user.displayName !== null) ? `, ${getFirstName(user.displayName)}` : ''}.
        </motion.p>
      </div>
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
          className='text-white font-semibold font-poppins lg:text-[42px] md:text-[32px] sm:text-[22px] text-[16px] pt-[20px] px-10'
        >
          The best map tool on the internet.
        </motion.p>
      </div>
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
          className='text-white font-semibold font-poppins lg:text-[26px] md:text-[22px] sm:text-[18px] text-[14px] pt-[25px] px-10'
        >
          Plan your trips with just a few clicks.
        </motion.p>
      </div>
      <div className='flex justify-center items-center text-white font-poppins 
        lg:text-[20px] md:text-[18px] sm:text-[16px] text-[16px] mt-[20px]'>
        <motion.a
          type='button' 
          className='flex flex-row items-center glassmorphism py-3 px-5 space-x-3'
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
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
          href='https://github.com/itsDaiton/swift'
          target='_blank'
        >
          <p>GitHub</p>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </motion.a>
      </div>
      <div className='flex justify-center pt-[120px]'>
        <motion.button
          type='button'
          className='glassmorphism text-white rounded-full shadow-xl font-poppins font-semibold
          lg:text-[38px] md:text-[28px] sm:text-[24px] text-[22px] px-10 py-5'
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
          whileHover={{
            scale: 1.2
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={handleNavigate}
        >
          {user ? 'Begin' : 'Sign In'}
        </motion.button>
      </div>
    </div>
  )
}

export default Input
