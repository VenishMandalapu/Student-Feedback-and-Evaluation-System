import React from 'react';
import { BookOpen, Users, Star, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const TeacherCourses: React.FC = () => {
  const { currentUser, setCurrentPage } = useApp();
  
  const teacherCourses = courses.filter(course => 
    course.teacherId === currentUser?.id
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">Manage your assigned courses and track student engagement</p>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Courses', value: teacherCourses.length, icon: BookOpen, color: 'text-blue-600' },
          { label: 'Total Students', value: teacherCourses.reduce((sum, course) => sum + course.students.length, 0), icon: Users, color: 'text-green-600' },
          { label: 'Average Rating', value: '4.3/5', icon: Star, color: 'text-yellow-600' },
          { label: 'Active Forms', value: '8', icon: MessageSquare, color: 'text-purple-600' }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teacherCourses.map((course) => {
          const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
          const feedbackCount = Math.floor(Math.random() * 20) + 10;
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <p className="text-blue-100 mt-1">{course.code}</p>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {course.semester} {course.year}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{course.students.length}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{feedbackCount}</div>
                    <div className="text-xs text-gray-500">Feedback</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      New feedback received from 3 students
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Course rating improved by 0.2 points
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      Upcoming feedback deadline: Feb 20
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCurrentPage('feedback-results')}
                    className="bg-blue-600 text-white py-3 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Feedback
                  </button>
                  <button
                    onClick={() => setCurrentPage('improvement-suggestions')}
                    className="bg-green-600 text-white py-3 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors font-medium"
                  >
                    Get Insights
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentPage('feedback-results')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-blue-700">Analyze Feedback</div>
            <div className="text-sm text-gray-600">Review student responses</div>
          </button>
          <button
            onClick={() => setCurrentPage('improvement-suggestions')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-green-700">Improvement Tips</div>
            <div className="text-sm text-gray-600">Enhance teaching methods</div>
          </button>
          <button
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-purple-700">Student Progress</div>
            <div className="text-sm text-gray-600">Track engagement metrics</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourses;