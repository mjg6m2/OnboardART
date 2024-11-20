import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOnboarding = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        assignedTo: '',  // Default value for assignedTo is empty
    });
    const [employees, setEmployees] = useState([]); // Store list of employees
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data); // Log the response to check the data structure
                if (response.data.success) {
                    setEmployees(response.data.employees); // Store employees in state
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                alert("Failed to fetch employees.");
            }
        };
    
        fetchEmployees();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/onboarding', task, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/onboarding");
            }
        } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Assign New Onboarding Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">Task Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mt-3">
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assign to (Employee)</label>
                    <select
                        name="assignedTo"
                        onChange={handleChange}
                        value={task.assignedTo}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select an Employee</option>
                        {employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                                {employee.name} {/* assuming employee object has 'name' */}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Assign Task
                </button>
            </form>
        </div>
    );
};

export default AddOnboarding;
