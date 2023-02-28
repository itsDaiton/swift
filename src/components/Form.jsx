import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router'

const Form = ({ type }) => {

  let navigate = useNavigate()

  const handleNavigate = () => {
    if (type === 'login') {
      navigate('/register')
    }
    else {
      navigate('/login')
    }
  }

  return (
    <div className='w-[500px] h-[900px] glassmorphism'>
      <div className='flex justify-center items-center pt-10'>
        <h4 className='text-white text-[32px] font-poppins'>
          {type === 'login' ? 'Login' : 'Register'}
        </h4>
      </div>
      <form className='mt-[20px]'>
        <div className='mx-10 mt-8'>
          <span className='text-[16px] font-poppins text-white mx-2'>Email</span>
          <div className='relative flex items-center text-white pt-2'>
            <FontAwesomeIcon icon={faUser} className='text-[24px] absolute ml-3 pointer-events-none'/>
            <input 
              placeholder='Email'
              type='text'
              autoComplete='off'
              className='text-[20px] w-full h-[55px] outline-none border-none glass-input font-poppins text-semibold pl-[48px] pr-3 placeholder-current'
            />
          </div>
        </div>
        <div className='mx-10 mt-8'>
          <span className='text-[16px] font-poppins text-white mx-2'>Password</span>
          <div className='relative flex items-center text-white pt-2'>
            <FontAwesomeIcon icon={faLock} className='text-[24px] absolute ml-3 pointer-events-none'/>
            <input 
              placeholder='Password'
              type='text'
              autoComplete='off'
              className='text-[20px] w-full h-[55px] outline-none border-none glass-input font-poppins text-semibold pl-[48px] pr-3 placeholder-current ring-2'
            />
          </div>
        </div>
        <div className='flex justify-center items-center pt-12'>
          <button 
            type='button'
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
              className='text-[24px] text-white bg-[#db4a39] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center inline-flex items-center px-5 py-2.5'
            >
              <FontAwesomeIcon icon={faGoogle} className='pr-5'/>
              Continue with Google
          </button>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#3b5998] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center inline-flex items-center px-5 py-2.5'
            >
              <FontAwesomeIcon icon={faFacebook} className='pr-5'/>
              Continue with Facebook
          </button>
        </div>
        <div className='flex justify-center items-center py-2'>
          <button 
              type='button'
              className='text-[24px] text-white bg-[#24292F] w-3/4 h-[60px] rounded-full shadow-xl font-poppins text-center inline-flex items-center px-5 py-2.5'
            >
              <FontAwesomeIcon icon={faGithub} className='pr-5'/>
              Continue with GitHub
          </button>
        </div>
        <div className='flex justify-center items-center pt-16 cursor-pointer'>
          <p className='text-white font-poppins text-[18px] underline' onClick={handleNavigate}>
            {type === 'login' ? "Don't have an account yet? Sign Up" : "Already have an account? Sign In"}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Form
