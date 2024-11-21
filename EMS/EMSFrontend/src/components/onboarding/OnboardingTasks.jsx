import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS

const OnboardingTasks = () => {
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedToDepartment, setAssignedToDepartment] = useState('');
  const [dueDate, setDueDate] = useState(null);

  // Hardcoded employees and departments (for now, just placeholders)
  const employees = [
    { _id: '1', name: 'John Doe' },
    { _id: '2', name: 'Jane Smith' },
  ];

  const departments = [
    { _id: '1', name: 'HR' },
    { _id: '2', name: 'Engineering' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder action on submit
    alert(`Task: ${taskName} has been assigned to ${assignedTo} in the ${assignedToDepartment} department! Due on ${dueDate}`);
    // Reset form after submit
    setTaskName('');
    setAssignedTo('');
    setAssignedToDepartment('');
    setDueDate(null);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Add Onboarding Task</h3>
      <form onSubmit={handleSubmit}>
        {/* Task Name Input */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-lg font-semibold">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="mt-2 p-2 border rounded-md w-full"
          />
        </div>

        {/* Assign to Employee Dropdown */}
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-lg font-semibold">
            Assign to Employee
          </label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assign to Department Dropdown */}
        <div className="mb-4">
          <label htmlFor="assignedToDepartment" className="block text-lg font-semibold">
            Assign to Department
          </label>
          <select
            id="assignedToDepartment"
            value={assignedToDepartment}
            onChange={(e) => setAssignedToDepartment(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date Picker */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-lg font-semibold">
            Due Date
          </label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="MMMM d, yyyy"
            className="mt-2 p-2 border rounded-md w-full"
            placeholderText="Select due date"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default OnboardingTasks;
