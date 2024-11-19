import React from 'react'
import { Link } from 'react-router-dom'

const TOList = () => {
    return (
        <div className = 'p-6'>
            <div className = "text-center">
              <h3 className = "text-2x1 font-bold">Manage Time Off</h3>
            </div>
        <div className = "flex justify-between items-center">
            <input
              type = "text"
              placeholder = "Search by Dep. Name"
              className = "px-4 py-0.5 border"
            />
            <Link
              to = "/employee-dashboard/request-time-off"
              className = "px-4 py-1 bg-teal-600 rounded text-white"
            >
                Request Time Off
            </Link>
        </div>
    </div>
  )
}

export default TOList