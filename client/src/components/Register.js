import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext.js'
import { Alert, Loading } from './index.js'


const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialState)

  const navigate = useNavigate()

  const { user, isLoading, showAlert, displayAlert, signUpUser, loginUser, } = useAppContext()


  const toggleChange = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

  }

  const OnSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values;

    if ((!isMember && !name) || !email || !password) {
      displayAlert("Please provide all the values", "danger");
      return
    }

    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)
    }
    else {
      signUpUser(currentUser)
    }

  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }, [user, navigate])

  return (
    <>
      {showAlert && <Alert />}
      {isLoading && <Loading />}
      <form className=' flex flex-col justify-center  bg-gray-100 border-2 h-screen lg:h-3/4 lg:w-1/2 lg:relative lg:left-1/4 lg:top-20  xl:relative xl:left-1/3 xl:w-1/3 xl:top-16 xl:h-auto 2xl:w-1/4 2xl:relative 2xl:left-1/3 2xl:ml-20' onSubmit={OnSubmit}>
        <div className='flex flex-col text-center mb-8 mt-8 xl:justify-center'>
          <p className='text-4xl text-orange-500 mt-3'>Task Manager</p>
          <h3 className='text-4xl mt-16 mb-12'>{values.isMember ? "Login" : "Register"}</h3>
        </div>
        {!values.isMember &&
          <div className='flex flex-col mb-5 text-center'>
            <label htmlFor="name" className='relative right-1/3 md:mr-6 md:text-xl lg:mr-1 lg:text-lg'>Name</label>
            <div>
              <input
                className=' w-3/4 h-10 rounded-sm border-gray-400 border-2 md:h-11 lg:h-10'
                type="text"
                name="name"
                onChange={handleChange}
              />

            </div>
          </div>}

        <div className='flex flex-col mb-5 text-center'>
          <label htmlFor="email" className=' relative right-1/3 md:mr-6 md:text-xl lg:mr-1 lg:text-lg '>Email</label>
          <div >
            <input
              className='  w-3/4 h-10 rounded-sm border-gray-400 border-2 md:h-11 lg:h-10 '
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='flex flex-col mb-5 text-center'>
          <label htmlFor="password" className='relative right-1/3 md:mr-6 md:text-xl lg:mr-1 lg:text-lg 2xl:mr-0 2xl:ml-3 2xl:pl-4'>Password</label>
          <div>

            <input
              className=' w-3/4 h-10 rounded-sm border-gray-400 border-2 md:h-11 lg:h-10'
              type="password"
              name="password" /*autoComplete='current-password'*/
              onChange={handleChange}

            />
          </div>
        </div>

        <div className='flex flex-col text-center mb-10 md:mb-24'>
          <div>

            <button
              type="submit"
              className=' mt-6 mb-2 w-3/4 h-10 rounded-sm bg-orange-300 border-2'
              disabled={isLoading}
            >
              {values.isMember ? "Login" : "Register"}
            </button>
            <p className=' mt-2'>
              {values.isMember ? "Not a member yet?" : "Already a member?"}
              <button
                type='button'
                className='ml-2 text-orange-500'
                onClick={toggleChange}
              >
                {values.isMember ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>

      </form>
    </>
  )
}

export default Register

