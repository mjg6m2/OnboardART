import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'

const AdminDashboard = () => {
    const {user} = useAuth()

    return (
        <div>
            <AdminSidebar/>
            <div className = 'flex-1 m1-64 bg-gray-100 h-screen'>
              <Navbar/>
              <AdminSummary/>
            </div>
        </div>
    )
}