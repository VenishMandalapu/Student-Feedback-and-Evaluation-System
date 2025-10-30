import React, { useState } from 'react';
import { FileText, Plus, Search, Settings, Eye, Edit, Trash2 } from 'lucide-react';

const FeedbackForms: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const feedbackForms = [
    {
      id: '1',
      title: 'Mid-Semester Course Evaluation',
      description: 'Standard evaluation form for mid-semester feedback',
      questions: 8,
      responses: 245,
      status: 'active',
      deadline: '2025-02-15',
      courses: 11
    },
    {
      id: '2',
      title: 'Instructor Teaching Assessment',
      description: 'Focused evaluation on teaching methodology and clarity',
      questions: 12,
      responses: 189,
      status: 'active',
      deadline: '2025-02-20',
      courses: 8
    },
    {
      id: '3',
      title: 'Facility & Services Feedback',
      description: 'Evaluation of institutional facilities and support services',
      questions: 6,
      responses: 98,
      status: 'draft',
      deadline: '2025-03-01',
      courses: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Forms</h1>
          <p className="text-gray-600 mt-2">Create and manage feedback forms for courses and services</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Form</span>
        </button>
      </div>

      {/* Form Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Forms', value: '3', icon: FileText, color: 'text-blue-600' },
          { label: 'Active Forms', value: '2', icon: Settings, color: 'text-green-600' },
          { label: 'Total Responses', value: '532', icon: Eye, color: 'text-purple-600' },
          { label: 'Response Rate', value: '87%', icon: FileText, color: 'text-yellow-600' }
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search feedback forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Forms List */}
      <div className="space-y-6">
        {feedbackForms.map((form) => (
          <div key={form.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{form.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(form.status)}`}>
                    {form.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{form.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>{form.questions} Questions</span>
                  <span>{form.responses} Responses</span>
                  <span>{form.courses} Courses</span>
                  <span>Deadline: {new Date(form.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{form.responses}</div>
                <div className="text-sm text-blue-600">Total Responses</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round((form.responses / 280) * 100)}%</div>
                <div className="text-sm text-green-600">Response Rate</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.{Math.floor(Math.random() * 5)}</div>
                <div className="text-sm text-purple-600">Avg. Rating</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  View Results
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Export Data
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: 2 days ago
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Feedback Form</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Form Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Form Description"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <input
                type="date"
                placeholder="Deadline"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Form Type</option>
                <option value="course">Course Evaluation</option>
                <option value="instructor">Instructor Assessment</option>
                <option value="facility">Facility Feedback</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-blue-700">Template Library</div>
            <div className="text-sm text-gray-600">Choose from pre-built forms</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-green-700">Bulk Deploy</div>
            <div className="text-sm text-gray-600">Deploy to multiple courses</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-purple-700">Schedule Forms</div>
            <div className="text-sm text-gray-600">Automate form distribution</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForms;