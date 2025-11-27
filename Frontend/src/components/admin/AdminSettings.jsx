import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Key, Download, FileText, Users, BookOpen, Building, Settings as SettingsIcon, Calendar, Eye, EyeOff, Save, Edit } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { users, courses } from '../../data/mockData';

const AdminSettings = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [feedbackSettings, setFeedbackSettings] = useState({
    anonymousEnabled: true,
    collectionStart: '',
    collectionEnd: '',
    questions: [
      'Rate the course content quality',
      'Rate the teaching effectiveness',
      'Rate the infrastructure and facilities',
      'Rate the overall experience'
    ]
  });

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'system', label: 'System Management', icon: SettingsIcon },
    { id: 'security', label: 'Security & Permissions', icon: Shield },
    { id: 'reports', label: 'Reports & Data Export', icon: FileText }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    // Save profile logic
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Change password logic
    alert('Password changed successfully!');
  };

  const handleExportData = (type) => {
    // Export logic
    alert(`${type} export initiated!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Manage your profile, system controls, and administrative settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Information Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value="Administrator"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload New Picture
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Management Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          {/* User Management */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Manage Users
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-blue-800">Students</p>
                <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'student').length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-green-800">Teachers</p>
                <p className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'teacher').length}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">Admins</p>
                <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add New User
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Manage Existing Users
              </button>
            </div>
          </div>

          {/* Subject & Course Management */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-600" />
              Manage Subjects & Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Subjects</h4>
                <p className="text-sm text-gray-600 mb-3">Total subjects: {courses.length}</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Add/Edit Subjects
                </button>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Departments</h4>
                <p className="text-sm text-gray-600 mb-3">Total departments: 5</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Manage Departments
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2 text-purple-600" />
              Feedback Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={feedbackSettings.anonymousEnabled}
                    onChange={(e) => setFeedbackSettings({...feedbackSettings, anonymousEnabled: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable anonymous feedback</span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Start Date</label>
                  <input
                    type="date"
                    value={feedbackSettings.collectionStart}
                    onChange={(e) => setFeedbackSettings({...feedbackSettings, collectionStart: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection End Date</label>
                  <input
                    type="date"
                    value={feedbackSettings.collectionEnd}
                    onChange={(e) => setFeedbackSettings({...feedbackSettings, collectionEnd: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Questions</label>
                <div className="space-y-2">
                  {feedbackSettings.questions.map((question, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => {
                          const newQuestions = [...feedbackSettings.questions];
                          newQuestions[index] = e.target.value;
                          setFeedbackSettings({...feedbackSettings, questions: newQuestions});
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security & Permissions Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-red-600" />
              Change Password
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable 2FA</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>

          {/* Access Logs */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-gray-600" />
              Access Logs
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Login from Chrome on Windows</p>
                  <p className="text-sm text-gray-500">IP: 192.168.1.100 • 2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Successful</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Login from Firefox on Windows</p>
                  <p className="text-sm text-gray-500">IP: 192.168.1.100 • 1 day ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Successful</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports & Data Export Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-600" />
              Data Export Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Feedback Data</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExportData('Full Feedback Data')}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Full Feedback Data</p>
                      <p className="text-sm text-gray-600">Complete dataset with all responses</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleExportData('Teacher-wise Summary')}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Teacher-wise Summary</p>
                      <p className="text-sm text-gray-600">Aggregated feedback by teacher</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleExportData('Course-wise Summary')}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Course-wise Summary</p>
                      <p className="text-sm text-gray-600">Aggregated feedback by course</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Historical Trends</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExportData('Semester Comparison')}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Semester Comparison</p>
                      <p className="text-sm text-gray-600">Compare feedback across semesters</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleExportData('Yearly Report')}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Yearly Report</p>
                      <p className="text-sm text-gray-600">Annual feedback analysis</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">All exports are available in CSV, Excel, and PDF formats.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
