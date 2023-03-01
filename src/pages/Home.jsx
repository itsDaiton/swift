import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { auth } from '../../utils/firebase'

const Home = () => {

  const [user, loading] = useAuthState(auth)
  let navigate = useNavigate()

  console.log(user)

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/login')
    })
  }

  return (
    <div>
      <div className='flex'>
        <h4>Home page.</h4>
        <div className='flex justify-center flex-row items-end'>
          <button type='button' onClick={handleSignOut} className=' bg-amber-100 mx-2 text-[18px] py-2 px-2 rounded-full font-semibold font-poppins'>
            Go to login.
          </button>
          <button type='button' onClick={handleSignOut} className=' bg-amber-100 mx-2 text-[18px] py-2 px-2 rounded-full font-semibold font-poppins'>
            Go to register.
          </button>
        </div>
      </div>
      {user && 
      <div className='flex flex-col'>
        <img
          src={user.photoURL}
          className='w-[50px] h-[50px] object-contain rounded-full'
        />
        <h4>{user.displayName}</h4>
        <h4>{user.email}</h4>
        <button type='button' onClick={handleSignOut} className='w-[100px] bg-amber-100 my-10 mx-10 text-[18px] py-2 px-2 rounded-full font-semibold font-poppins'>Sign Out</button>
      </div>
      }
    </div>
  )
}

export default Home
