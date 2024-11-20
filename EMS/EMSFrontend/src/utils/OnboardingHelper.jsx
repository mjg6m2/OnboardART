import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the columns for the onboarding table (adjust according to your data structure)
export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Task Name",
        selector: (row) => row.task_name, // Assuming each onboarding item has a task_name
        sortable: true
    },
    {
        name: "Assigned To",
        selector: (row) => row.assigned_to, // Assuming you have an 'assigned_to' field
    },
    {
        name: "Status",
        selector: (row) => row.status, // Assuming there's a 'status' field for each task
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

// Button component for Edit and Delete actions (similar to DepartmentButtons)
export const OnboardingButtons = ({ _id, onOnboardingDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirm = window.confirm("Do you want to delete this task?");
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/onboarding/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    onOnboardingDelete(_id); // Callback function to update UI after deletion
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/onboarding/${_id}`)} // Edit task
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 text-white"
                onClick={handleDelete} // Delete task
            >
                Delete
            </button>
        </div>
    );
};
