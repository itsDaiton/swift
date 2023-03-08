import { 
  faLock,
  faUser,
  faTriangleExclamation
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
  GithubAuthProvider,
  updateProfile,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { authErrors } from '../../utils/firebase-errors'

const Form = ({ type }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [providerError, setProviderError] = useState('')
  const [user, loading] = useAuthState(auth)

  let navigate = useNavigate()

  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const githubProvider = new GithubAuthProvider()

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

  const clearError = () => {
    setError('')
    setProviderError('')
  }

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      navigate('/')
    }).catch((error) => {
      clearError()
      setError(authErrors[`${error.code}`])
    }) 
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      navigate('/')
    }).catch((error) => {
      clearError()
      setError(authErrors[`${error.code}`])
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearError()
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
      navigate('/')
    } catch (error) {
      clearError()
      setProviderError(authErrors[`${error.code}`])
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
      clearError()
      setProviderError(authErrors[`${error.code}`]) 
    }
  }

  const gitHubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      navigate('/')
    } catch (error) {
      clearError()
      setProviderError(authErrors[`${error.code}`])
    }
  }

  
  const oauth = [
    {
      text: 'Continue with Google',
      icon: faGoogle,
      color: 'bg-[#db4a39]',
      action: googleAuth
    },
    {
      text: 'Continue with Facebook',
      icon: faFacebook,
      color: 'bg-[#3b5998]',
      action: facebookAuth
    },
    {
      text: 'Continue with GitHub',
      icon: faGithub,
      color: 'bg-[#24292F]',
      action: gitHubAuth
    },
  ]

  return (
    <div className='glassmorphism sm:py-10 py-5 px-1 mx-10 my-10 w-[600px]'>
      <div className='flex justify-center items-center'>
        <h4 className='text-white lg:text-[32px] md:text-[26px] sm:text-[24px] text-[20px] font-poppins'>
          {type === 'login' ? 'Login' : 'Register'}
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mx-10 lg:mt-8 mt-0'>
          <span className={`text-[16px] font-poppins mx-2 ${error ? 'text-red-600' : 'text-white'}`}>Email</span>
          <div className={`relative flex items-center ${error ? 'text-red-600' : 'text-white'} pt-1`}>
            <FontAwesomeIcon icon={faUser} className='text-[24px] absolute ml-3 pointer-events-none z-10'/>
            <input 
              placeholder='Email'
              type='text'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='lg:text-[20px] md:text-[18px] sm:text-[18px] text-[16px] w-full sm:h-[55px] h-[45px] outline-none border-none 
              glass-input font-poppins text-semibold 
              pl-[48px] pr-3 placeholder-current'
            />
          </div>
        </div>
        <div className='mx-10 mt-4'>
          <span className={`text-[16px] font-poppins mx-2 ${error ? 'text-red-600' : 'text-white'}`}>Password</span>
          <div className={`relative flex items-center ${error ? 'text-red-600' : 'text-white'} pt-1`}>
            <FontAwesomeIcon icon={faLock} className='text-[24px] absolute ml-3 pointer-events-none z-10'/>
            <input 
              placeholder='Password'
              type='password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='lg:text-[20px] md:text-[18px] sm:text-[18px] text-[16px] w-full sm:h-[55px] h-[45px] outline-none border-none 
              glass-input font-poppins text-semibold
              pl-[48px] pr-3 placeholder-current'
            />
          </div>
        </div>
        <div className='flex justify-center items-center flex-col relative pt-5'>
          <div className={`flex justify-center items-center glass-error text-white sm:mb-10 mb-4 w-fit text-sm font-poppins py-2 mx-8 ${error || providerError ? 'visible' : 'invisible'}`}>
            <FontAwesomeIcon icon={faTriangleExclamation} className='text-[24px] pr-4 pl-4'/>
            <p className='text-[14px] pr-4'>{error || providerError}</p>
          </div>
          <button 
            type='submit'
            className='button-gradient lg:text-[24px] md:text-[22px] sm:text-[20px] text-[18px] text-white sm:py-5 py-4 px-16 rounded-full 
            shadow-xl font-poppins'
          >
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <div className='relative flex py-5 items-center my-3 font-poppins'>
          <div className='flex-grow border-t-2 border-white ml-10'/>
          <span className='flex-shrink mx-4 text-white'>Or</span>
          <div className='flex-grow border-t-2 border-white mr-10'/>
        </div>
        <div>
          {oauth.map((provider, index) => (
          <div className='flex justify-center items-center py-2 px-10' key={index}>
            <button 
                type='button'
                className={`text-[24px] text-white sm:w-[100%] w-fit px-10 py-3 rounded-full shadow-xl font-poppins
                text-center inline-flex items-center ${provider.color} flex justify-center`}
                onClick={provider.action}
              >
                <FontAwesomeIcon icon={provider.icon} className='sm:pr-5 pr-0'/>
                <span className='sm:flex hidden'>{provider.text}</span>
            </button>
          </div>          
          ))}
        </div>
      </form>
      <div className='flex justify-center items-center pt-4'>
        <p className='text-white font-poppins lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] underline cursor-pointer text-center px-10' onClick={handleNavigate}>
          {type === 'login' ? "Don't have an account yet? Sign Up" : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  )
}

export default Form
