import React from 'react'
import SummaryCard from './SummaryCard'
import {FaUsers, FaBuilding, FaMoneyBillWave, FaFileAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf} from 'react-icons/fa'

const AdminSummary = () => {
    return (
        <div className = 'p-6'>
            <h3 className = 'text-2x1 font-bold'>Dashboard Overview</h3>
            <div className = 'grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon = {<FaUsers/>} text = "Total Employees" number = {13} color = "bg-teal-600"/>
                <SummaryCard icon = {<FaBuilding/>} text = "Total Departments" number = {5} color = "bg-yellow-600"/>
                <SummaryCard icon = {<FaMoneyBillWave/>} text = "Monthly Salary" number = "$654" color = "bg-red-600"/>
            </div>

            <div className = "mt-12">
                <h4 className = "text-center text-2x1 font-bold">Time Off Details</h4>
            
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard icon = {<FaFileAlt/>} text = "Time Off Taken" number = {5} color = "bg-teal-600"/>
                    <SummaryCard icon = {<FaCheckCircle/>} text = "Time Off Approved" number = {2} color = "bg-green-600"/>
                    <SummaryCard icon = {<FaHourglassHalf/>} text = "Time Off Pending" number = {4} color = "bg-yellow-600"/>
                    <SummaryCard icon = {<FaTimesCircle/>} text = "Time Off Rejected" number = {1} color = "bg-red-600"/>
                </div>
            </div>
        
        </div>
    )
}

export default AdminSummary