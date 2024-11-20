import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const responnse = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (responnse.data.success) {
        let sno = 1;
        const data = await responnse.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data)
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data)
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Time Off</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Seach By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => filterByButton("Approved")}>
                Approved
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => filterByButton("Rejected")}>
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-[#F4F2F8]">
  <div className="flex flex-col items-center">
    <div className="spinner-border animate-spin h-8 w-8 border-4 border-t-[#58536E] border-[#F4F2F8] rounded-full mb-4"></div>
    <p className="text-xl font-semibold text-[#58536E]">Loading...</p>
  </div>
</div>

      )}
    </>
  );
};

export default Table;
