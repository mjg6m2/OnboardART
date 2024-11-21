import React, { useState } from "react";

const OnboardingSection = () => {
  // Example onboarding tasks (random made-up ones for now)
  const tasks = [
    { taskName: "Complete initial HR paperwork", dueDate: "2024-11-25" },
    { taskName: "Watch onboarding training video", dueDate: "2024-11-26" },
    { taskName: "Set up email and software accounts", dueDate: "2024-11-27" },
    { taskName: "Review company policies and guidelines", dueDate: "2024-11-28" },
    { taskName: "Attend team introduction meeting", dueDate: "2024-11-29" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold text-[#58536E]">Onboarding Tasks</h3>
      <div className="mt-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="text-[#58536E]">
              <span className="font-medium">{task.taskName}</span>
            </div>
            <div className="text-sm text-gray-500">
              Due: {task.dueDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingSection;
