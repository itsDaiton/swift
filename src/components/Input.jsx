import React from 'react'
import Autocompelte from 'react-google-autocomplete'
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin, setDestination, selectOrigin, selectDestination } from '../slices/coordsSlice'
import { useNavigate } from 'react-router'

const Input = () => {

  const [user, loading] = useAuthState(auth)

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const dispatch = useDispatch()

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
      <div className='flex justify-center items-center space-x-[70px] pt-[160px]'>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocationDot} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
          <Autocompelte
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
              dispatch(
                setOrigin({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  name: place.formatted_address        
                })
              )
            }}
            placeholder='Where from?'
            className='text-[28px] h-[80px] outline-none border-none glassmorphism font-poppins text-semibold
            pl-[60px] pr-10 placeholder-current'
          />
        </div>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocation} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
          <Autocompelte
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
              dispatch(
                setDestination({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  name: place.formatted_address              
                })
              )
            }}
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
          onClick={handleNavigate}
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
