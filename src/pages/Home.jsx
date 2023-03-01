import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'

const Home = () => {

  const [user, loading] = useAuthState(auth)

  return (
    <div>
      Home page.
      {user && 
      <div>
        <img
          src={user.photoURL}
        />
        <h4>{user.displayName}</h4>
        <h4>{user.email}</h4>
      </div>
      }
    </div>
  )
}

export default Home
