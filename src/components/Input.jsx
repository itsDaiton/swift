import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const Input = () => {

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/map')
  }

  const getFirstName = (name) => {
    let parts = name.split(' ')
    return parts[0]
  }

  if (loading) {
    return <div>Loading...</div>
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
          className='text-white font-semibold font-poppins text-[108px] pt-[80px]'
        >
          Welcome to Swift{user.displayName !== null ? `, ${getFirstName(user.displayName)}` : ''}.
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
          className='text-white font-semibold font-poppins text-[42px] pt-[20px]'
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
          className='text-white font-semibold font-poppins text-[26px] pt-[25px]'
        >
          Plan your trips with just a few clicks.
        </motion.p>
      </div>
      <div className='flex justify-center items-center text-white font-poppins text-[20px] mt-[20px]'>
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
          type='submit'
          className={`glassmorphism text-[38px] text-white w-[15%] h-[90px] rounded-full shadow-xl font-poppins font-semibold`}
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
          Begin
        </motion.button>
      </div>
    </div>
  )
}

export default Input
