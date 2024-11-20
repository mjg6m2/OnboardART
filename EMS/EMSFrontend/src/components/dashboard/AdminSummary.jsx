import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(summary.data)
        setSummary(summary.data)
      } catch(error) {
        if(error.response) {
          alert(error.response.data.error)
        }
        console.log(error.messsage)
      }
    }
    fetchSummary()
  }, [])

  if(!summary) {
    return <div className="flex justify-center items-center h-screen bg-[#F4F2F8]">
    <div className="flex flex-col items-center">
      <div className="spinner-border animate-spin h-8 w-8 border-4 border-t-[#58536E] border-[#F4F2F8] rounded-full mb-4"></div>
      <p className="text-xl font-semibold text-[#58536E]">Loading...</p>
    </div>
  </div>
  
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-[#4561DB]"  // Primary blue
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-[#DFE8FF]"  // Light blue
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={`$${summary.totalSalary}`}
          color="bg-[#FF4D4D]"  // Strong red
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-[#4561DB]"  // Primary blue
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-[#4CAF50]"  // Soft green
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-[#DFE8FF]"  // Light blue
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-[#FF1F1F]"  // Bright red
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
