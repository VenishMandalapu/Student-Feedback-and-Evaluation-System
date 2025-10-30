import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, Users, BookOpen, Mail } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('comprehensive');
  const [dateRange, setDateRange] = useState('semester');
  const [showPreview, setShowPreview] = useState(false);

  const reportTypes = [
    {
      id: 'comprehensive',
      title: 'Comprehensive Analytics Report',
      description: 'Complete institutional feedback analysis with all metrics',
      icon: BarChart3,
      features: ['Faculty ratings', 'Course performance', 'Student satisfaction', 'Response rates', 'Trend analysis']
    },
    {
      id: 'faculty',
      title: 'Faculty Performance Report',
      description: 'Individual and comparative faculty performance metrics',
      icon: Users,
      features: ['Individual ratings', 'Course-wise breakdown', 'Improvement suggestions', 'Peer comparisons']
    },
    {
      id: 'course',
      title: 'Course Evaluation Report',
      description: 'Detailed analysis of course feedback and student satisfaction',
      icon: BookOpen,
      features: ['Course ratings', 'Student comments', 'Enrollment data', 'Difficulty analysis']
    },
    {
      id: 'executive',
      title: 'Executive Summary',
      description: 'High-level overview for institutional leadership',
      icon: FileText,
      features: ['Key metrics', 'Strategic insights', 'Recommendations', 'Comparative analysis']
    }
  ];

  const recentReports = [
    { name: 'Fall 2025 Comprehensive Report.pdf', date: '2025-01-15', size: '2.4 MB', downloads: 45 },
    { name: 'Faculty Performance Q1.xlsx', date: '2025-01-10', size: '1.8 MB', downloads: 23 },
    { name: 'Student Satisfaction Analysis.pdf', date: '2025-01-05', size: '3.1 MB', downloads: 67 },
    { name: 'Course Evaluation Summary.pdf', date: '2024-12-20', size: '1.9 MB', downloads: 34 }
  ];

  const handleGenerateReport = () => {
    setShowPreview(true);
    // In a real application, this would trigger report generation
    setTimeout(() => {
      setShowPreview(false);
      console.log('Report generated and downloaded');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Generate comprehensive reports and export institutional data</p>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Reports Generated', value: '156', icon: FileText, color: 'text-blue-600' },
          { label: 'Total Downloads', value: '1,234', icon: Download, color: 'text-green-600' },
          { label: 'Active Subscriptions', value: '23', icon: Mail, color: 'text-purple-600' },
          { label: 'Scheduled Reports', value: '8', icon: Calendar, color: 'text-orange-600' }
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

      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Select Report Type</h3>
            <div className="space-y-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedReportType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">{type.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Report Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                  <option value="year">Academic Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    PDF Report
                  </button>
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    Excel Data
                  </button>
                </div>
              </div>

              {selectedReportType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Features</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {reportTypes.find(t => t.id === selectedReportType)?.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Report Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date Generated</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Downloads</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-gray-600">{report.size}</td>
                    <td className="px-6 py-4 text-gray-600">{report.downloads}</td>
                    <td className="px-6 py-4">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Report...</h3>
            <p className="text-gray-600">Please wait while we compile your analytics report.</p>
          </div>
        </div>
      )}

      {/* Scheduled Reports */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Reporting</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-blue-700">Schedule Reports</div>
            <div className="text-sm text-gray-600">Set up automatic generation</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-green-700">Email Subscriptions</div>
            <div className="text-sm text-gray-600">Manage email recipients</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-purple-700">Custom Templates</div>
            <div className="text-sm text-gray-600">Create report templates</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;