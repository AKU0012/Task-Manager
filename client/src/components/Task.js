import React from 'react'
import { useAppContext } from '../context/appContext.js'

const Task = ({ _id, description }) => {
  const { setUpdateTask, deleteTask } = useAppContext();
  return (
    <div >
      
    <div className='border-2 border-orange-400 m-auto mt-1 mb-1 p-3 min-h-min w-5/6 flex  '>
      <div className='w-5/6'>
        {description}
        
      </div>
      <div className=''>
        <i className=' cursor-pointer bg-orange-300 rounded-md w-8 m-1' onClick={() => { setUpdateTask(_id) }}>Edit</i>
        <i className=' cursor-pointer bg-orange-300 rounded-md w-8 m-1' onClick={() => { deleteTask(_id) }}>Del</i>
      </div>
    </div>
    </div>
  )
}

export default Task
/*
<form className=' flex flex-col justify-center  bg-gray-100 border-2 h-screen  sm:bg-pink-50 md:bg-red-200 lg:bg-slate-300 lg:h-3/4 lg:w-2/5 xl:bg-blue-300' onSubmit={OnSubmit}>

*/ 