import React, { useState } from 'react'
import Autocompelte from 'react-google-autocomplete'
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'

const Input = () => {

  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [user, loading] = useAuthState(auth)
  
  console.log(destination)
  console.log(origin)

  if (destination) {
    console.log(destination.geometry.location.lat())
    console.log(destination.geometry.location.lng())
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
      <div className='flex justify-center items-center space-x-[70px] pt-[160px]'>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocationDot} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
          <Autocompelte
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => setOrigin(place)}
            placeholder='Where from?'
            className='text-[28px] h-[80px] outline-none border-none glassmorphism font-poppins text-semibold
            pl-[60px] pr-10 placeholder-current'
          />
        </div>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocation} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
          <Autocompelte
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => setDestination(place)}
            placeholder='Where to?'
            className='text-[28px] h-[80px] outline-none border-none glassmorphism font-poppins text-semibold
            pl-[60px] pr-10 placeholder-current'
          />
        </div>
      </div>
      <div className='flex justify-center pt-[80px]'>
        {origin && destination ?
        <motion.button
          disabled={origin && destination ? false : true}
          type='submit'
          className={`glassmorphism text-[28px] text-white w-[10%] h-[70px] rounded-full shadow-xl font-poppins 
          ${origin && destination ? '' : 'opacity-60'}`}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
        >
          Begin
        </motion.button>
        :
        <button
          disabled={origin && destination ? false : true}
          type='submit'
          className={`glassmorphism text-[28px] text-white w-[10%] h-[70px] rounded-full shadow-xl font-poppins 
          ${origin && destination ? '' : 'opacity-60'}`}
        >
          Begin
        </button>
        }
      </div>
    </div>
  )
}

export default Input
