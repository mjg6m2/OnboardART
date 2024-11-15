import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Fetch departments from the server
    const fetchDepartments = async () => {
        setDepLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/department', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.departments.map((dep) => ({
                    _id: dep._id,
                    sno: sno++, 
                    dep_name: dep.dep_name,
                    action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />),
                }));

                setDepartments(data);
                setFilteredDepartments(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setDepLoading(false);
        }
    };

    // Delete department and then refetch the list
    const onDepartmentDelete = async (id) => {
        setLoadingDelete(true); // Show loading spinner during deletion

        try {
            // Perform the deletion on the backend
            const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.success) {
                // Re-fetch the list of departments after deletion
                fetchDepartments(); // This will reset both departments and filteredDepartments state
            } else {
                alert('Failed to delete department.');
            }
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Failed to delete department.');
        } finally {
            setLoadingDelete(false); // Hide the loading spinner
        }
    };

    // Filter departments by name
    const filterDepartments = (e) => {
        const query = e.target.value.toLowerCase();
        const records = departments.filter(dep =>
            dep.dep_name.toLowerCase().includes(query)
        );
        setFilteredDepartments(records);
    };

    // Fetch departments on initial load
    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <>{depLoading ? <div>Loading...</div> :
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input
                    type="text"
                    placeholder='Search by Dept. Name'
                    className='px-4 py-0.5 border'
                    onChange={filterDepartments}
                    disabled={loadingDelete} // Disable search while deleting
                />
                <Link
                    to="/admin-dashboard/add-department"
                    className='px-4 py-1 bg-teal-600 rounded text-white'
                >
                    Add New Department
                </Link>
            </div>
            <div className='mt-5'>
                <DataTable
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                    progressPending={loadingDelete} // Show a loading spinner while deleting
                />
            </div>
        </div>
        }</>
    );
};

export default DepartmentList;
