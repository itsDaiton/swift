import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Navbar from '../components/Navbar'
import Output from '../components/Output'

const Map = () => {

  const [user, loading] = useAuthState(auth)

  return (
    <div>
      <Navbar/>
      <Output/>   
    </div>
  )
}

export default Map
