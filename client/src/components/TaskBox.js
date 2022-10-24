import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext.js'
import Task from './Task.js'

const TaskBox = () => {
  const { tasks, getTasks } = useAppContext()

  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, [])

  if (tasks.length === 0) {
    return (
      <div className=" p-4 text-center ">
        <div className='mt-6 text-2xl lg:mt-10'>
          No tasks to display</div>
      </div>
    )
  }
  return (
    <div className='flex justify-center'>

      <div className=" flex flex-col text-center justify-center w-full  sm:w-3/4 md:w-2/3 lg:w-1/2">

        {tasks.map((task) => {
          return <Task key={task._id} {...task} />
        })}


      </div>
    </div>
  )
}

export default TaskBox