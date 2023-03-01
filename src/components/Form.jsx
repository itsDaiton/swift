import { 
  faLock,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { 
  faGithub,
  faGoogle,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../utils/firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const Form = ({ type }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)

  let navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  

  const handleNavigate = () => {
    if (type === 'login') {
      navigate('/register')
    }
    else {
      navigate('/login')
    }
  }

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log(credentials)
      navigate('/home')
    }).catch((error) => {
      console.log(error)
    }) 
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log(credentials)
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === 'login') {  
      signIn()
    }
    else {
      signUp()
    }
  }

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result.user)  
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const facebookAuth = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const credential = await FacebookAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      let picUrl = result.user.photoURL + `?height=500&access_token=${token}`
      await updateProfile(auth.currentUser, { photoURL: picUrl})   
    } catch (error) {
      console.log(error)  
    }
  }

  return (
    <div className='w-[500px] h-[900px] glassmorphism'>
      <div className='flex justify-center items-center pt-10'>
        <h4 className='text-white text-[32px] font-poppins'>
          {type === 'login' ? 'Login' : 'Register'}
        </h4>
      </div>
      <form className='mt-[20px]' onSubmit={handleSubmit}>
        <div className='mx-10 mt-8'>
          <span className='text-[16px] font-poppins text-white mx-2'>Email</span>
          <div className='relative flex items-center text-white pt-2'>
            <FontAwesomeIcon icon={faUser} className='text-[24px] absolute ml-3 pointer-events-none'/>
            <input 
              placeholder='Email'
              type='text'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='text-[20px] w-full h-[55px] outline-none border-none glass-input font-poppins text-semibold 
              pl-[48px] pr-3 placeholder-current'
            />
          </div>
        </div>
        <div className='mx-10 mt-8'>
          <span className='text-[16px] font-poppins text-white mx-2'>Password</span>
          <div className='relative flex items-center text-white pt-2'>
            <FontAwesomeIcon icon={faLock} className='text-[24px] absolute ml-3 pointer-events-none'/>
            <input 
              placeholder='Password'
              type='password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-[20px] w-full h-[55px] outline-none border-none glass-input font-poppins text-semibold
               pl-[48px] pr-3 placeholder-current ring-2'
            />
          </div>
        </div>
        <div className='flex justify-center items-center pt-12'>
          <button 
            type='submit'
            className='button-gradient text-[24px] text-white w-3/4 h-[60px] rounded-full shadow-xl font-poppins'
          >
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <div className='relative flex py-5 items-center my-3 font-poppins'>
          <div className='flex-grow border-t-2 border-white ml-10'/>
          <span className='flex-shrink mx-4 text-white'>Or</span>
          <div className='flex-grow border-t-2 border-white mr-10'/>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#db4a39] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center
              inline-flex items-center px-5 py-2.5'
              onClick={googleAuth}
            >
              <FontAwesomeIcon icon={faGoogle} className='pr-5'/>
              {type === 'login' ? 'Continue with Google' : 'Sign Up with Google'}
          </button>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#3b5998] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center
              inline-flex items-center px-5 py-2.5'
              onClick={facebookAuth}
            >
              <FontAwesomeIcon icon={faFacebook} className='pr-5'/>
              {type === 'login' ? 'Continue with Facebook' : 'Sign Up with Facebook'}
          </button>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#24292F] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center
              inline-flex items-center px-5 py-2.5'
            >
              <FontAwesomeIcon icon={faGithub} className='pr-5'/>
              {type === 'login' ? 'Continue with GitHub' : 'Sign Up with GitHub'}
          </button>
        </div>
        <div className='flex justify-center items-center pt-16'>
          <p className='text-white font-poppins text-[18px] underline cursor-pointer' onClick={handleNavigate}>
            {type === 'login' ? "Don't have an account yet? Sign Up" : "Already have an account? Sign In"}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Form
