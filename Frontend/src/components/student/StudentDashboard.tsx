import React from 'react';
import { MessageSquare, BarChart3, Calendar, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { setCurrentPage, currentUser } = useApp();
  
  const studentCourses = courses.filter(course => 
    course.students.includes(currentUser?.id || '')
  );

  const quickActions = [
    {
      id: 'give-feedback',
      title: 'Give Feedback',
      description: 'Submit feedback for your courses',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => setCurrentPage('give-feedback')
    },
    {
      id: 'view-results',
      title: 'View Course Results',
      description: 'Check aggregated feedback results',
      icon: BarChart3,
      color: 'bg-green-600',
      action: () => setCurrentPage('view-results')
    },
    {
      id: 'deadlines',
      title: 'Check Deadlines',
      description: 'View upcoming feedback deadlines',
      icon: Calendar,
      color: 'bg-purple-600',
      action: () => setCurrentPage('deadlines')
    },
    {
      id: 'my-courses',
      title: 'My Courses',
      description: 'View all enrolled courses',
      icon: BookOpen,
      color: 'bg-orange-600',
      action: () => setCurrentPage('my-courses')
    }
  ];

  const stats = [
    { label: 'Enrolled Courses', value: studentCourses.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Pending Feedback', value: '3', icon: MessageSquare, color: 'text-orange-600' },
    { label: 'Completed Forms', value: '12', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Days to Deadline', value: '5', icon: Clock, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
        <p className="text-gray-600 mt-2">Academic Year 2025 - Fall Semester</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left border border-gray-100 hover:-translate-y-1"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Courses */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentCourses.slice(0, 6).map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {course.code}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Instructors: {course.teachers.join(', ')}</p>
              <p className="text-sm text-gray-500">{course.semester} {course.year}</p>
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => setCurrentPage('give-feedback')}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Give Feedback
                </button>
                <button 
                  onClick={() => setCurrentPage('view-results')}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  View Results
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;