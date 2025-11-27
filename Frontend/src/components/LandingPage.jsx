import React from 'react';
import { GraduationCap, Users, BookOpen, ArrowRight, Star, Award, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LandingPage = () => {
  const { setCurrentPage } = useApp();

  const handleGetStarted = () => {
    setCurrentPage('role-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <GraduationCap className="w-16 h-16 text-blue-600" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Student Feedback &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Evaluation System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering academic excellence through comprehensive feedback and evaluation for the 2025 academic year
            </p>

            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to enhance educational quality through structured feedback and data-driven insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Feedback</h3>
              <p className="text-gray-600">
                Detailed course evaluations and student insights to drive continuous improvement
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Excellence</h3>
              <p className="text-gray-600">
                Data-driven analytics and performance tracking for enhanced educational outcomes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Insights</h3>
              <p className="text-gray-600">
                Instant access to feedback results and actionable recommendations for improvement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Preview Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-lg text-gray-600">
              Access tailored features based on your academic role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
              <p className="text-gray-600 text-sm">
                Submit feedback, view results, track deadlines
              </p>
            </div>

            {/* Teacher */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Teachers</h3>
              <p className="text-gray-600 text-sm">
                Analyze feedback, get insights, improve courses
              </p>
            </div>

            {/* Admin */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Administrators</h3>
              <p className="text-gray-600 text-sm">
                Manage faculty, courses, and system analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Student Feedback & Evaluation System • Powered by Educational Excellence Initiative
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
