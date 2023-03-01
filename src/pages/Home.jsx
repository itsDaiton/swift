import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Navbar from '../components/Navbar'


const Home = () => {

  const [user, loading] = useAuthState(auth)

  return (
    <div>
      <Navbar/>
      <h4>Home page.</h4>
    </div>
  )
}

export default Home
