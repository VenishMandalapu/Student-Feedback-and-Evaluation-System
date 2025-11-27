import React from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RoleSelection: React.FC = () => {
  const { setSelectedRole, setCurrentPage } = useApp();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Student Feedback & Evaluation System
          </h1>
          <p className="text-xl text-gray-600">Academic Year 2025</p>
          <p className="text-lg text-gray-500 mt-2">Select your role to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Student Role */}
          <div 
            onClick={() => handleRoleSelect('student')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer p-8 text-center border-2 border-transparent hover:border-blue-200"
          >
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
            <p className="text-gray-600 mb-6">
              Submit course feedback, view results, and track deadlines
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Give Course Feedback</p>
              <p>✓ View Aggregated Results</p>
              <p>✓ Check Deadlines</p>
            </div>
          </div>

          {/* Teacher Role */}
          <div 
            onClick={() => handleRoleSelect('teacher')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer p-8 text-center border-2 border-transparent hover:border-green-200"
          >
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher</h3>
            <p className="text-gray-600 mb-6">
              View student feedback, analyze course performance, and get insights
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ View Course Feedback</p>
              <p>✓ Analytics & Insights</p>
              <p>✓ Improvement Suggestions</p>
            </div>
          </div>

          {/* Admin Role */}
          <div 
            onClick={() => handleRoleSelect('admin')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer p-8 text-center border-2 border-transparent hover:border-purple-200"
          >
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin</h3>
            <p className="text-gray-600 mb-6">
              Manage faculty, courses, analytics, and institutional oversight
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Faculty Management</p>
              <p>✓ Course Administration</p>
              <p>✓ System Analytics</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Powered by Educational Excellence Initiative • 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;