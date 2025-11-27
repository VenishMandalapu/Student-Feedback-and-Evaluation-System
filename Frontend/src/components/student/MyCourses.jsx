import React from 'react';
import { BookOpen, Users, Calendar, Star, Clock, TrendingUp } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const MyCourses = () => {
  const { currentUser, setCurrentPage } = useApp();
  
  const studentCourses = courses.filter(course => 
    course.students.includes(currentUser?.id || '')
  );

  const getRandomProgress = () => Math.floor(Math.random() * 40) + 60; // 60-100%

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">Academic Year 2025 - Fall Semester</p>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Enrolled Courses', value: studentCourses.length, icon: BookOpen, color: 'text-blue-600' },
          { label: 'Active Feedback', value: '5', icon: Star, color: 'text-yellow-600' },
          { label: 'Average Progress', value: '78%', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Upcoming Deadlines', value: '3', icon: Clock, color: 'text-red-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {studentCourses.map((course) => {
          const progress = getRandomProgress();
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <p className="text-blue-100 mt-1">{course.code}</p>
                  </div>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {course.semester}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{course.teacher}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Next Deadline</div>
                    <div className="font-medium text-gray-900">Feb 15</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="font-medium text-gray-900">4.2/5</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCurrentPage('give-feedback')}
                    className="bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium"
                  >
                    Give Feedback
                  </button>
                  <button
                    onClick={() => setCurrentPage('view-results')}
                    className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
                  >
                    View Results
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentPage('give-feedback')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-blue-700">Submit Feedback</div>
            <div className="text-sm text-gray-600">Complete pending forms</div>
          </button>
          <button
            onClick={() => setCurrentPage('deadlines')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-yellow-700">Check Deadlines</div>
            <div className="text-sm text-gray-600">View upcoming submissions</div>
          </button>
          <button
            onClick={() => setCurrentPage('view-results')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-green-700">View Analytics</div>
            <div className="text-sm text-gray-600">Check course insights</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
