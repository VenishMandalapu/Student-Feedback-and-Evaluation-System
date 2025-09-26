import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Star, Filter, Download, Calendar } from 'lucide-react';
import Chart from '../shared/Chart';
import { courses, analytics } from '../../data/mockData';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('semester');
  const [selectedMetric, setSelectedMetric] = useState('satisfaction');

  const overallStats = [
    { label: 'Overall Satisfaction', value: '4.3/5', icon: Star, color: 'text-yellow-600', change: '+12%' },
    { label: 'Response Rate', value: '87%', icon: Users, color: 'text-green-600', change: '+5%' },
    { label: 'Active Courses', value: courses.length, icon: BarChart3, color: 'text-blue-600', change: '+4 courses' },
    { label: 'Improvement Score', value: '+15%', icon: TrendingUp, color: 'text-purple-600', change: '+3%' }
  ];

  const satisfactionTrends = [
    { label: 'Jan', value: 4.1 },
    { label: 'Feb', value: 4.3 },
    { label: 'Mar', value: 4.2 },
    { label: 'Apr', value: 4.5 },
    { label: 'May', value: 4.4 }
  ];

  const departmentPerformance = [
    { label: 'Computer Science', value: 4.5 },
    { label: 'Data Science', value: 4.3 },
    { label: 'AI/ML', value: 4.2 },
    { label: 'Software Eng.', value: 4.4 },
    { label: 'Cybersecurity', value: 4.1 }
  ];

  const responseDistribution = [
    { label: 'Excellent (5)', value: 45 },
    { label: 'Good (4)', value: 30 },
    { label: 'Average (3)', value: 18 },
    { label: 'Below Average (2)', value: 5 },
    { label: 'Poor (1)', value: 2 }
  ];

  const facultyRankings = [
    { name: 'Dr. Sadhana', rating: 4.6, courses: 4, responses: 156 },
    { name: 'Prof. Mallikarjun Rao', rating: 4.4, courses: 3, responses: 142 },
    { name: 'Dr. Jonathon', rating: 4.2, courses: 4, responses: 168 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive feedback analytics and institutional insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">Academic Year</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="bar"
          title="Satisfaction Trends (5 Month View)"
          data={satisfactionTrends}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="pie"
          title="Response Distribution"
          data={responseDistribution}
          className="shadow-sm border border-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="bar"
          title="Department Performance"
          data={departmentPerformance}
          className="shadow-sm border border-gray-100"
        />

        {/* Faculty Rankings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Faculty Performance</h3>
          <div className="space-y-4">
            {facultyRankings.map((faculty, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{faculty.name}</p>
                    <p className="text-sm text-gray-500">{faculty.courses} courses • {faculty.responses} responses</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{faculty.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Daily Active Users</span>
              <span className="font-medium">1,245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg. Session Time</span>
              <span className="font-medium">8.5 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Mobile Usage</span>
              <span className="font-medium">68%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Highest Rated</span>
              <span className="font-medium">Frontend Frameworks</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Most Improved</span>
              <span className="font-medium">Database Systems</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Highest Enrollment</span>
              <span className="font-medium">AI & Machine Learning</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Best Response Rate</span>
              <span className="font-medium">Computer Networks</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-medium">0.8s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-medium text-green-600">0.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Accuracy</span>
              <span className="font-medium text-green-600">99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Positive Trends</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Student satisfaction improved by 12% this semester</li>
              <li>• Response rates are consistently above 85%</li>
              <li>• Faculty engagement with feedback increased by 23%</li>
              <li>• Mobile usage indicates strong accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Consider more interactive feedback formats</li>
              <li>• Implement real-time feedback alerts for faculty</li>
              <li>• Expand analytics dashboard for department heads</li>
              <li>• Add predictive analytics for student satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;