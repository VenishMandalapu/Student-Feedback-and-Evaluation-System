import React, { useState } from 'react';
import { BarChart3, Users, Star, TrendingUp, MessageSquare, Filter } from 'lucide-react';
import Chart from '../shared/Chart';
import { courses, analytics } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const FeedbackResults: React.FC = () => {
  const { currentUser } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  const teacherCourses = courses.filter(course => 
    course.teacherId === currentUser?.id
  );

  const overallStats = [
    { label: 'Average Rating', value: '4.3/5', icon: Star, color: 'text-yellow-600' },
    { label: 'Total Responses', value: '245', icon: Users, color: 'text-blue-600' },
    { label: 'Response Rate', value: '87%', icon: BarChart3, color: 'text-green-600' },
    { label: 'Improvement', value: '+12%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const ratingDistribution = [
    { label: 'Excellent (5)', value: 45 },
    { label: 'Good (4)', value: 30 },
    { label: 'Average (3)', value: 18 },
    { label: 'Below Average (2)', value: 5 },
    { label: 'Poor (1)', value: 2 }
  ];

  const courseComparison = teacherCourses.map(course => ({
    label: course.code,
    value: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10
  }));

  const recentComments = [
    {
      course: 'Computer Network',
      comment: 'Excellent practical demonstrations and clear explanations.',
      rating: 5,
      date: '2 days ago'
    },
    {
      course: 'Database Management System', 
      comment: 'Good content but could use more real-world examples.',
      rating: 4,
      date: '3 days ago'
    },
    {
      course: 'Artificial Intelligence',
      comment: 'Very engaging lectures and well-structured curriculum.',
      rating: 5,
      date: '1 week ago'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Results</h1>
          <p className="text-gray-600 mt-2">Analyze student feedback across your courses</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              {teacherCourses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="pie"
          title="Rating Distribution"
          data={ratingDistribution}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="bar"
          title="Course-wise Ratings"
          data={courseComparison}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Course-wise Breakdown */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Course Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {teacherCourses.map((course) => {
            const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
            const responseRate = Math.floor(Math.random() * 30) + 70;
            const totalResponses = Math.floor(Math.random() * 20) + 10;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{rating}/5</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="font-medium">{responseRate}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Responses</span>
                    <span className="font-medium">{totalResponses}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Trend</span>
                      <span className="text-green-600 font-medium flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +5.2%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Comments */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Student Comments</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {recentComments.map((comment, index) => (
            <div key={index} className={`p-6 ${index !== recentComments.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{comment.course}</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(comment.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
                </div>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackResults;