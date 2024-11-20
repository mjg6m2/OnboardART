import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditOnboarding = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        task_name: '',
        description: '',
        due_date: ''
    });
    const [taskLoading, setTaskLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            setTaskLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/onboarding/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (response.data.success) {
                    setTask(response.data.task);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setTaskLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/onboarding/${id}`, task, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate('/admin-dashboard/onboarding');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {taskLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6">Edit Onboarding Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="task_name" className="text-sm font-medium text-gray-700">Task Name</label>
                            <input
                                type="text"
                                name="task_name"
                                onChange={handleChange}
                                value={task.task_name}
                                placeholder="Task Name"
                                className="mt-l w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                placeholder="Description"
                                value={task.description}
                                className="mt-l p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="due_date" className="text-sm font-medium text-gray-700">Due Date</label>
                            <input
                                type="date"
                                name="due_date"
                                onChange={handleChange}
                                value={task.due_date}
                                className="mt-l w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit Task
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditOnboarding;
