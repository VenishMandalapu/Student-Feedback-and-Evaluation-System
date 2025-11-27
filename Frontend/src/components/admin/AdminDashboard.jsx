import React from 'react';
import { Users, BookOpen, FileText, BarChart3, TrendingUp, UserCheck, GraduationCap, Award, Brain } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses, users } from '../../data/mockData';
import Chart from '../shared/Chart';

const AdminDashboard = () => {
  const { setCurrentPage, currentUser } = useApp();
  
  const totalFaculty = users.filter(user => user.role === 'teacher').length;
  const totalStudents = users.filter(user => user.role === 'student').length;
  const totalCourses = courses.length;

  const quickActions = [
    {
      id: 'faculty-management',
      title: 'Faculty Management',
      description: 'Manage faculty assignments and approvals',
      icon: Users,
      color: 'bg-blue-600',
      action: () => setCurrentPage('faculty-management')
    },
    {
      id: 'course-management',
      title: 'Course Management',
      description: 'Add and manage engineering courses',
      icon: BookOpen,
      color: 'bg-green-600',
      action: () => setCurrentPage('course-management')
    },
    {
      id: 'student-management',
      title: 'Student Management',
      description: 'Manage student records and analytics',
      icon: GraduationCap,
      color: 'bg-indigo-600',
      action: () => setCurrentPage('student-management')
    },
    {
      id: 'analytics',
      title: 'System Analytics',
      description: 'View comprehensive feedback analytics',
      icon: BarChart3,
      color: 'bg-purple-600',
      action: () => setCurrentPage('analytics')
    },
    {
      id: 'decision-making',
      title: 'Decision Making',
      description: 'Actionable insights and recommendations',
      icon: Brain,
      color: 'bg-red-600',
      action: () => setCurrentPage('decision-making')
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'Export detailed institutional reports',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => setCurrentPage('reports')
    }
  ];

  const stats = [
    { label: 'Total Faculty', value: totalFaculty, icon: Users, color: 'text-blue-600' },
    { label: 'Active Students', value: totalStudents, icon: GraduationCap, color: 'text-green-600' },
    { label: 'Engineering Courses', value: totalCourses, icon: BookOpen, color: 'text-purple-600' },
    { label: 'Avg Students/Teacher', value: Math.round(totalStudents / totalFaculty), icon: Award, color: 'text-yellow-600' }
  ];

  const facultyPerformanceData = [
    { label: 'Dr. Sadhana', value: 4.5 },
    { label: 'Prof. Mallikarjun', value: 4.3 },
    { label: 'Dr. Jonathon', value: 4.1 }
  ];

  const courseEnrollmentData = [
    { label: 'Computer Science', value: 45 },
    { label: 'Data Science', value: 30 },
    { label: 'Software Eng.', value: 25 },
    { label: 'AI/ML', value: 35 },
    { label: 'Cybersecurity', value: 20 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {currentUser?.name} - Educational Institution Management Portal</p>
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">Administrative Actions</h2>
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
          type="bar"
          title="Faculty Performance Ratings"
          data={facultyPerformanceData}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="pie"
          title="Course Enrollment Distribution"
          data={courseEnrollmentData}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Faculty Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New faculty approval pending', faculty: 'Dr. Priya Sharma', time: '2 hours ago', status: 'pending' },
              { action: 'Course assignment completed', faculty: 'Prof. Mallikarjun Rao', time: '1 day ago', status: 'completed' },
              { action: 'Feedback form submitted', faculty: 'Dr. Jonathon', time: '2 days ago', status: 'completed' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.faculty} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage('faculty-management')}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Activities
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Insights</h3>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Student Satisfaction Up</span>
              </div>
              <p className="text-sm text-green-600">Average rating improved by 12% this semester</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">High Response Rate</span>
              </div>
              <p className="text-sm text-blue-600">87% students actively providing feedback</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">Course Expansion</span>
              </div>
              <p className="text-sm text-purple-600">4 new engineering courses added this year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentPage('faculty-management')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-blue-700">Approve Faculty</div>
            <div className="text-sm text-gray-600">Review pending applications</div>
          </button>
          <button
            onClick={() => setCurrentPage('course-management')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-green-700">Add Courses</div>
            <div className="text-sm text-gray-600">Manage course catalog</div>
          </button>
          <button
            onClick={() => setCurrentPage('analytics')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-purple-700">View Analytics</div>
            <div className="text-sm text-gray-600">Institutional insights</div>
          </button>
          <button
            onClick={() => setCurrentPage('reports')}
            className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
          >
            <div className="font-medium text-orange-700">Export Reports</div>
            <div className="text-sm text-gray-600">Generate PDF/Excel</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
