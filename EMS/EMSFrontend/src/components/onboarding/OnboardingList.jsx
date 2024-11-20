import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, OnboardingButtons } from '../../utils/OnboardingHelper'; // Import the appropriate helper file
import axios from 'axios';

const OnboardingList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskLoading, setTaskLoading] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Fetch onboarding tasks from the server
    const fetchTasks = async () => {
        setTaskLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/onboarding', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.tasks.map((task) => ({
                    _id: task._id,
                    sno: sno++, 
                    task_name: task.task_name,
                    description: task.description,
                    due_date: task.due_date,
                    action: (<OnboardingButtons _id={task._id} onTaskDelete={onTaskDelete} />), // Action buttons for each task
                }));

                setTasks(data);
                setFilteredTasks(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setTaskLoading(false);
        }
    };

    // Delete onboarding task and then refetch the list
    const onTaskDelete = async (id) => {
        setLoadingDelete(true); // Show loading spinner during deletion

        try {
            // Perform the deletion on the backend
            const response = await axios.delete(`http://localhost:3000/api/onboarding/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.success) {
                // Re-fetch the list of tasks after deletion
                fetchTasks(); // This will reset both tasks and filteredTasks state
            } else {
                alert('Failed to delete task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task.');
        } finally {
            setLoadingDelete(false); // Hide the loading spinner
        }
    };

    // Filter tasks by name
    const filterTasks = (e) => {
        const query = e.target.value.toLowerCase();
        const records = tasks.filter(task =>
            task.task_name.toLowerCase().includes(query)
        );
        setFilteredTasks(records);
    };

    // Fetch tasks on initial load
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>{taskLoading ? <div>Loading...</div> :
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Onboarding Tasks</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input
                    type="text"
                    placeholder='Search by Task Name'
                    className='px-4 py-0.5 border'
                    onChange={filterTasks}
                    disabled={loadingDelete} // Disable search while deleting
                />
                <Link
                    to="/admin-dashboard/onboarding/add"
                    className='px-4 py-1 bg-teal-600 rounded text-white'
                >
                    Add New Task
                </Link>
            </div>
            <div className='mt-5'>
                <DataTable
                    columns={columns}
                    data={filteredTasks}
                    pagination
                    progressPending={loadingDelete} // Show a loading spinner while deleting
                />
            </div>
        </div>
        }</>
    );
};

export default OnboardingList;
