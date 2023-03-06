import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { auth } from '../../utils/firebase'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/coordsSlice'

const Navbar = () => {

	const [user, loading] = useAuthState(auth)

	let navigate = useNavigate()

  const dispatch = useDispatch()

	const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch(
        setOrigin(null)
      )
      dispatch(
        setDestination(null)
      )
      navigate('/login')
    })
  }

	const goToLogin = () => {
		navigate('/login')
	}

	const goToRegister = () => {
		navigate('/register')
	}

  return (
    <div className='flex justify-between bg-black text-white h-[7vh]'>
			<div className='flex justify-center items-center pl-6 space-x-4'>
				<FontAwesomeIcon icon={faPaperPlane} className='text-[36px]'/>
				<p className='text-[36px] font-poppins tracking-widest font-bold'>
					SWIFT
				</p>
			</div>
			{user ?
			<div className='flex justify-center items-center pr-6 space-x-6'>
				<p 
					className='text-[18px] font-poppins cursor-pointer font-semibold'
					onClick={handleSignOut}
				>
					Sign Out
				</p>
				<img
          src={user.photoURL}
          className='w-[40px] h-[40px] object-contain rounded-full'
        />
			</div>
			: 
			<div className='flex justify-center items-center pr-6 space-x-6'>
				<p 
					className='text-[18px] font-poppins cursor-pointer font-semibold'
					onClick={goToRegister}
				>
					Register
				</p>
				<p 
					className='text-[18px] font-poppins cursor-pointer font-semibold'
					onClick={goToLogin}
				>
					Login
				</p>
			</div>		
			}
    </div>
  )
}

export default Navbar
