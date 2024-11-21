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
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error.message);
      }
    };
    fetchSummary();

    // Set the current date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4F2F8]">
        <div className="flex flex-col items-center">
          <div className="spinner-border animate-spin h-8 w-8 border-4 border-t-[#58536E] border-[#F4F2F8] rounded-full mb-4"></div>
          <p className="text-xl font-semibold text-[#58536E]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F4F2F8] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-[#58536E]">Dashboard Overview</h3>
        <span className="text-[#58536E] font-semibold text-lg">{currentDate}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <h4 className="text-center text-2xl font-semibold text-[#58536E]">Leave Details</h4>
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
