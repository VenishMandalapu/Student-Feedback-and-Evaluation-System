import React, { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, Award, Target, FileText, Users, BookOpen, Lightbulb, Flag } from 'lucide-react';
import Chart from '../shared/Chart';
import { courses, users, analytics } from '../../data/mockData';

const DecisionMaking = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for decision-making insights
  const performanceScores = [
    { teacher: 'Dr. Sadhana', course: 'Data Structures', score: 4.6, category: 'teaching-quality' },
    { teacher: 'Prof. Mallikarjun Rao', course: 'Algorithms', score: 4.4, category: 'teaching-quality' },
    { teacher: 'Dr. Jonathon', course: 'Database Systems', score: 4.2, category: 'course-content' },
    { teacher: 'Dr. Priya Sharma', course: 'Web Development', score: 3.8, category: 'infrastructure' },
  ];

  const alerts = [
    { id: 1, type: 'critical', message: 'Lab facilities in Computer Networks course rated below 3.0', category: 'infrastructure', priority: 'high' },
    { id: 2, type: 'warning', message: 'Repeated feedback on unclear syllabus in 3 courses', category: 'course-content', priority: 'medium' },
    { id: 3, type: 'info', message: 'Interactive teaching methods highly praised in AI/ML course', category: 'teaching-quality', priority: 'low' },
  ];

  const recommendations = [
    { category: 'teaching-quality', title: 'Implement Interactive Teaching', description: 'Introduce more hands-on sessions and group activities based on student feedback.', impact: 'High' },
    { category: 'course-content', title: 'Update Syllabus Structure', description: 'Revise course outlines to include more practical applications and real-world examples.', impact: 'Medium' },
    { category: 'infrastructure', title: 'Upgrade Lab Equipment', description: 'Invest in modern computers and software for programming labs.', impact: 'High' },
  ];

  const categoryData = [
    { label: 'Teaching Quality', value: 45 },
    { label: 'Course Content', value: 30 },
    { label: 'Infrastructure', value: 15 },
    { label: 'Administration', value: 10 },
  ];

  const satisfactionIndex = [
    { label: 'Jan', value: 4.1 },
    { label: 'Feb', value: 4.3 },
    { label: 'Mar', value: 4.2 },
    { label: 'Apr', value: 4.5 },
    { label: 'May', value: 4.4 },
  ];

  const filteredAlerts = selectedCategory === 'all' ? alerts : alerts.filter(alert => alert.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Decision-Making Module</h1>
        <p className="text-gray-600 mt-2">Transform analyzed data into actionable insights and recommendations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Student Satisfaction Index</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.4/5</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Recommendations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <Lightbulb className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Improvement Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">+15%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Data Interpretation & Categorization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="pie"
          title="Feedback Categories Distribution"
          data={categoryData}
          className="shadow-sm border border-gray-100"
        />

        <Chart
          type="line"
          title="Student Satisfaction Index Trend"
          data={satisfactionIndex}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Performance Evaluation */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Performance Evaluation
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-medium text-gray-700">Teacher</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Course</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Score</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {performanceScores.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">{item.teacher}</td>
                  <td className="py-3 px-4">{item.course}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{item.score}</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full mr-1 ${i < Math.floor(item.score) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === 'teaching-quality' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'course-content' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.score >= 4.5 ? 'bg-green-100 text-green-800' :
                      item.score >= 4.0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.score >= 4.5 ? 'Excellent' : item.score >= 4.0 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert System */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Flag className="w-5 h-5 mr-2 text-red-600" />
            Alert System
          </h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="teaching-quality">Teaching Quality</option>
            <option value="course-content">Course Content</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.priority === 'high' ? 'border-red-500 bg-red-50' :
              alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-600' :
                    alert.priority === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">Category: {alert.category.replace('-', ' ')}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Support - Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
          Decision Support & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                  rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600">{rec.description}</p>
              <div className="mt-3 flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">Implement</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Teacher Evaluation Reports
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Dr. Sadhana - Semester Report</p>
                <p className="text-sm text-gray-600">Generated: 2 days ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Prof. Mallikarjun Rao - Annual Review</p>
                <p className="text-sm text-gray-600">Generated: 1 week ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Course Improvement Suggestions
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-green-800">Database Systems</p>
              <p className="text-sm text-green-600">Add more practical SQL exercises and real-world case studies</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-800">Web Development</p>
              <p className="text-sm text-blue-600">Include modern frameworks like React in the curriculum</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">AI & Machine Learning</p>
              <p className="text-sm text-purple-600">Increase lab hours and provide access to GPU resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionMaking;
