import React from 'react';
import { BookOpen, Users, BarChart3, TrendingUp, MessageSquare, Award, Star, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses, analytics } from '../../data/mockData';
import Chart from '../shared/Chart';

const TeacherDashboard: React.FC = () => {
  const { setCurrentPage, currentUser } = useApp();
  
  const teacherCourses = courses.filter(course => 
    course.teacherIds.includes(currentUser?.id || '')
  );

  const quickActions = [
    {
      id: 'teacher-courses',
      title: 'My Courses',
      description: 'View assigned courses and students',
      icon: BookOpen,
      color: 'bg-blue-600',
      action: () => setCurrentPage('teacher-courses')
    },
    {
      id: 'feedback-results',
      title: 'Feedback Results',
      description: 'View student feedback and ratings',
      icon: BarChart3,
      color: 'bg-green-600',
      action: () => setCurrentPage('feedback-results')
    },
    {
      id: 'improvement-suggestions',
      title: 'Improvement Tips',
      description: 'Get teaching enhancement insights',
      icon: TrendingUp,
      color: 'bg-purple-600',
      action: () => setCurrentPage('improvement-suggestions')
    },
    {
      id: 'student-performance',
      title: 'Student Insights',
      description: 'Analyze student engagement',
      icon: Users,
      color: 'bg-orange-600',
      action: () => setCurrentPage('student-performance')
    }
  ];

  const stats = [
    { label: 'Assigned Courses', value: teacherCourses.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Students', value: teacherCourses.reduce((sum, course) => sum + course.students.length, 0), icon: Users, color: 'text-green-600' },
    { label: 'Average Rating', value: '4.3/5', icon: Star, color: 'text-yellow-600' },
    { label: 'Feedback Forms', value: '12', icon: MessageSquare, color: 'text-purple-600' }
  ];

  const recentFeedbackData = [
    { label: 'Excellent', value: 45 },
    { label: 'Good', value: 30 },
    { label: 'Average', value: 20 },
    { label: 'Poor', value: 5 }
  ];

  const courseRatingsData = teacherCourses.slice(0, 5).map(course => ({
    label: course.code,
    value: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.name}!</h1>
        <p className="text-gray-600 mt-2">Academic Year 2025 - Fall Semester Teaching Dashboard</p>
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

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="pie"
          title="Student Feedback Distribution"
          data={recentFeedbackData}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="bar"
          title="Course Ratings Overview"
          data={courseRatingsData}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Recent Course Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teacherCourses.slice(0, 6).map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-gray-600 mb-2">{course.code}</p>
              <p className="text-sm text-gray-500 mb-2">{course.students.length} students enrolled</p>
              <p className="text-xs text-gray-400 mb-4">Teachers: {course.teachers.join(', ')}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.2/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Last feedback: 2 days ago</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setCurrentPage('feedback-results')}
                  className="bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  View Feedback
                </button>
                <button 
                  onClick={() => setCurrentPage('teacher-courses')}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Course Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;