import React from 'react'
import { useAppContext } from '../context/appContext.js'

const Alert = () => {
    const { alertMsg, alertType} = useAppContext()
    let bgColor = ""

    if (alertType === 'danger') {
      bgColor = 'bg-red-300 text-center align-middle h-12'
    }
    else{
      bgColor = 'bg-green-200 text-center align-middle h-12'
    }
  return (<>
    
    <div className={bgColor}>
        <span>{alertMsg}</span>
    </div>
    </>
  )
}

export default Alert