import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Navbar from '../components/Navbar'
import Input from '../components/Input'


const Home = () => {

  const [user, loading] = useAuthState(auth)

  return (
    <div>
      <Navbar/>
      <Input/>
    </div>
  )
}

export default Home
