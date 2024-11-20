import React, { useState, useEffect } from "react";

const OnboardingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { taskName: task, assignedTo: "Employee Name" }]);
      setTask("");
    }
  };

  // Simulate loading tasks (e.g., fetch from an API)
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      // Simulate data fetching delay
      setTimeout(() => {
        setTasks([{ taskName: "Task 1", assignedTo: "Employee 1" }]);
        setLoading(false); // Set loading to false once tasks are loaded
      }, 2000);
    };

    fetchTasks();
  }, []);

  if (loading) {
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
    <div className="p-6">
      <h3 className="text-2xl font-bold">Onboarding Tasks</h3>
      <div className="my-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="border px-4 py-2 rounded-md"
        />
        
        <button
          onClick={addTask}
          className="ml-2 px-4 py-2 bg-[#6B7DFF] hover:bg-[#4A61C1] text-white rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
        >
          Add Task
        </button>
      </div>

      <div>
        <h4 className="text-xl font-semibold">Assigned Tasks</h4>
        <ul className="list-disc pl-6">
          {tasks.map((task, index) => (
            <li key={index}>
              {task.taskName} - Assigned to: {task.assignedTo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnboardingTasks;
