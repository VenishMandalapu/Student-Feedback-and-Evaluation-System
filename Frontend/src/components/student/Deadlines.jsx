import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const Deadlines = () => {
  const { currentUser, setCurrentPage } = useApp();
  
  const studentCourses = courses.filter(course => 
    course.students.includes(currentUser?.id || '')
  );

  const deadlines = [
    {
      id: '1',
      title: 'Mid-Semester Feedback - Computer Network',
      course: 'Computer Network',
      dueDate: '2025-02-15',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Instructor Evaluation - Frontend Frameworks',
      course: 'Frontend Frameworks',
      dueDate: '2025-02-18',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Course Feedback - Artificial Intelligence',
      course: 'Artificial Intelligence',
      dueDate: '2025-02-20',
      status: 'pending',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Final Evaluation - Object Oriented Programming',
      course: 'Object Oriented Programming',
      dueDate: '2025-02-10',
      status: 'completed',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Service Feedback - Library Services',
      course: 'Institutional Services',
      dueDate: '2025-02-25',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const getDaysUntilDeadline = (dateString) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-yellow-700';
      case 'low': return 'text-green-700';
      default: return 'text-gray-700';
    }
  };

  const pendingDeadlines = deadlines.filter(d => d.status === 'pending');
  const completedDeadlines = deadlines.filter(d => d.status === 'completed');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback Deadlines</h1>
        <p className="text-gray-600 mt-2">Stay on top of your feedback submissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Feedback', value: pendingDeadlines.length, icon: Clock, color: 'text-orange-600' },
          { label: 'Due This Week', value: '2', icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Completed', value: completedDeadlines.length, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Total Courses', value: studentCourses.length, icon: Calendar, color: 'text-blue-600' }
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

      {/* Pending Deadlines */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Deadlines</h2>
        <div className="space-y-4">
          {pendingDeadlines.map((deadline) => {
            const daysLeft = getDaysUntilDeadline(deadline.dueDate);
            return (
              <div 
                key={deadline.id} 
                className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${getPriorityColor(deadline.priority)} border border-gray-100`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{deadline.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityTextColor(deadline.priority)} bg-opacity-20`}>
                        {deadline.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{deadline.course}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className={daysLeft <= 3 ? 'text-red-600 font-medium' : ''}>
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage('give-feedback')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Deadlines */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Completed Feedback</h2>
        <div className="space-y-4">
          {completedDeadlines.map((deadline) => (
            <div 
              key={deadline.id} 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 opacity-75"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{deadline.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full font-medium text-green-700 bg-green-100">
                      COMPLETED
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{deadline.course}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <span className="text-green-600 font-medium">✓ Submitted</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setCurrentPage('give-feedback')}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="font-medium">Submit Feedback</div>
            <div className="text-sm text-blue-600">Complete pending forms</div>
          </button>
          <button 
            onClick={() => setCurrentPage('view-results')}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="font-medium">View Results</div>
            <div className="text-sm text-blue-600">Check feedback outcomes</div>
          </button>
          <button 
            onClick={() => setCurrentPage('my-courses')}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="font-medium">My Courses</div>
            <div className="text-sm text-blue-600">View enrolled courses</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deadlines;
