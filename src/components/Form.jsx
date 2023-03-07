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

  if (loading) {
    return <div className='bg-gradient h-screen text-white'>Loading...</div>
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
          <span className={`text-[16px] font-poppins mx-2 ${error ? 'text-red-600' : 'text-white'}`}>Email</span>
          <div className={`relative flex items-center ${error ? 'text-red-600' : 'text-white'} pt-1`}>
            <FontAwesomeIcon icon={faUser} className='text-[24px] absolute ml-3 pointer-events-none z-10'/>
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
              className='text-[20px] w-full h-[55px] outline-none border-none glass-input font-poppins text-semibold
               pl-[48px] pr-3 placeholder-current'
            />
          </div>
        </div>
        <div className='flex justify-center items-center flex-col relative pt-10'>
          <div className={`flex justify-center items-center glass-error text-white mb-10 text-sm font-poppins w-fit py-2 mx-8 ${error || providerError ? 'visible' : 'invisible'}`}>
            <FontAwesomeIcon icon={faTriangleExclamation} className='text-[24px] pr-4 pl-4'/>
            <p className='text-[14px] pr-4'>{error || providerError}</p>
          </div>
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
              Continue with Google
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
              Continue with Facebook
          </button>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#24292F] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center
              inline-flex items-center px-5 py-2.5'
              onClick={gitHubAuth}
            >
              <FontAwesomeIcon icon={faGithub} className='pr-5'/>
              Continue with GitHub
          </button>
        </div>
      </form>
      <div className='flex justify-center items-center pt-4'>
        <p className='text-white font-poppins text-[18px] underline cursor-pointer' onClick={handleNavigate}>
          {type === 'login' ? "Don't have an account yet? Sign Up" : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  )
}

export default Form
