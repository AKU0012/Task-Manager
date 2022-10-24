import React from 'react'
import { useAppContext } from '../context/appContext';

const TaskContainer = () => {
  const { handleChange, displayAlert, updateTask, createTask, getTasks, isLoading, clearValues, description, isEditing } = useAppContext()

  const handleTaskChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value })
  }

  const OnSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      displayAlert("Please provide the value", "danger");
      return
    }

    const currentTask = { description }

    if (isEditing) {
      updateTask(currentTask);
      getTasks();
    }
    else {
      createTask(currentTask)
      getTasks();
    }

  }

  const clearvalue = () => {
    clearValues()
  }
  return (
    <>
      <form className='h-1/4 mt-4 mb-4 md:h-60 flex text-center justify-center' onSubmit={OnSubmit}>
        <div className='bg-slate-100 w-screen h-full border-orange-300 border-2 flex flex-col text-center sm:w-3/4 md:w-2/3 md:h-5/6 md:relative  md:top-6 lg:w-1/2  ' >
          <div className='mt-6 md:mb-6 lg:mt-11'>
            <input type="text" name="description" value={description} className='p-2 border-orange-400 border-2 h-12 w-3/4 ' onChange={handleTaskChange} />
          </div>
          <div className='mt-8 mb-4 sm:mb-0'>
            <button type="submit" className='bg-orange-200 border-orange-400 border-2 h-10 w-1/6 mr-4' disabled={isLoading}>Done</button>
            <button type="button" onClick={clearvalue} className='bg-orange-200 border-orange-400 border-2  h-10 w-1/6 ml-4' disabled={isLoading}>clear</button>

          </div>
        </div>
      </form>
    </>

  )
}

export default TaskContainer