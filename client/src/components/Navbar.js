import React from 'react'
import { useAppContext } from '../context/appContext'

const Navbar = () => {
    const {logoutUser}=useAppContext()
    return (
        <>
            {/* <div className=''> */}
            <div className='bg-orange-300 h-14  flex items-center sticky'>
                <div>
                    <span className='text-xl ml-2 sm:text-3xl sm:ml-8 sm:mr-1'>Task</span>
                    <span className='text-xl ml-2 sm:text-3xl sm:ml-2'>Manager</span>
                </div>
                <div className='absolute right-4 border-black border-2 '>
                    <button type="button" className='left-3' onClick={logoutUser}>logout</button>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default Navbar