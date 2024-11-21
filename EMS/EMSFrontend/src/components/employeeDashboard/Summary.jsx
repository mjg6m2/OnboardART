import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import OnboardingSection from '../onboarding/OnboardingSection';

const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* User Info Section */}
      <div className="rounded-lg flex bg-white shadow-lg">
        <div className="text-3xl flex justify-center items-center text-white bg-[#58536E] px-6 py-4 rounded-l-lg">
        <img
            src='../public/images/panda.jpg'
            alt="Employee"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </div>
        <div className="pl-4 py-4">
          <p className="text-lg font-semibold text-[#58536E]">Welcome Back</p>
          <p className="text-xl font-bold text-[#58536E]">{user.name}</p>
        </div>
      </div>

      {/* Onboarding Tasks Section */}
      <OnboardingSection />

    </div>
  );
};

export default SummaryCard;
