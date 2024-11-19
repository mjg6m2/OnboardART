import React from 'react'
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Add = () => {
    const {user} = useAuth()

    const [timeOff, setTimeOff] = useState({
        userId: user._id,
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setTimeOff((prevState) => ({...prevState, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/timeoff/request`,timeOff,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
              navigate('/employee-dashboard/time-off')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className = "max-w-4x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className = "text-2x1 font-bold mb-6">Request Time Off</h2>
            <form onSubmit = {handleSubmit}>
                <div className = "flex flex-col space-y-4">
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Request Type
                        </label>
                        <select
                          name = "requestType"
                          onChange = {handleChange}
                          className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        >
                            <option value = "">Select Department</option>
                            <option value = "Sick">Sick</option>
                            <option value = "Personal">Personal</option>
                            <option value = "Vacation">Vacation</option>
                        </select>
                    </div>
                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* from date */}
                        <div>
                            <label className = "block text-sm font-medium text-gray-700">
                                From
                            </label>
                            <input
                              type = "date"
                              name = "startDate"
                              onChange = {handleChange}
                              className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                              required
                            />
                        </div>

                        {/* to date */}
                        <div>
                            <label className = "block text-sm font-medium text-gray-700">
                                To
                            </label>
                            <input
                              type = "date"
                              name = "endDate"
                              onChange = {handleChange}
                              className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                              required
                            />
                        </div>
                    </div>

                    {/* description */}
                    <div>
                        <label className = "block text-sm font-medium text gray-700">
                            Description
                        </label>
                        <textarea
                          name = "reason"
                          placeholder = "Reason"
                          onChange = {handleChange}
                          className = "w-full border border-gray-300"
                        ></textarea>
                    </div>
                </div>
                <button
                  type = "submit"
                  className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Add Salary
                </button>
            </form>
        </div>
    )
}

export default Add