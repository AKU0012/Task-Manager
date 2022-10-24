import React from 'react'
import { useAppContext } from '../context/appContext.js'
import {Alert, Navbar, TaskContainer} from './index.js'
import TaskBox from './TaskBox.js'

const Home = () => {
  const {showAlert} = useAppContext()
  
  return (
    <div className='h-screen'>
    <Navbar/>
    {showAlert&& <Alert/>}
    <TaskContainer/>
    <TaskBox/>
    
    </div>
  )
}

export default Home