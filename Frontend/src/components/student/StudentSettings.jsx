import React, { useState } from 'react';
import { User, Mail, BookOpen, Bell, Key, Eye, EyeOff, Save, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses } from '../../data/mockData';

const StudentSettings = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    rollNumber: 'CS2024001',
    department: 'Computer Science',
    year: '3rd Year',
    semester: '6th Semester',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    feedbackDeadlines: true,
    submissionConfirmations: true,
    systemUpdates: false
  });

  // Mock data for enrolled subjects
  const enrolledSubjects = [
    { id: 1, name: 'Data Structures', code: 'CS201', teacher: 'Dr. Sadhana', feedbackSubmitted: true, deadline: '2024-01-15' },
    { id: 2, name: 'Algorithms', code: 'CS301', teacher: 'Prof. Mallikarjun Rao', feedbackSubmitted: false, deadline: '2024-01-20' },
    { id: 3, name: 'Database Systems', code: 'CS401', teacher: 'Dr. Jonathon', feedbackSubmitted: true, deadline: '2024-01-10' },
    { id: 4, name: 'Web Development', code: 'CS501', teacher: 'Dr. Priya Sharma', feedbackSubmitted: false, deadline: '2024-01-25' }
  ];

  // Mock feedback submission history
  const feedbackHistory = [
    { subject: 'Data Structures', submittedDate: '2024-01-12', status: 'completed' },
    { subject: 'Database Systems', submittedDate: '2024-01-08', status: 'completed' },
    { subject: 'Operating Systems', submittedDate: '2023-12-15', status: 'completed' }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'feedback', label: 'Feedback Settings', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Key }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value
    });
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
  };

  const handleSubmitFeedback = (subjectId) => {
    alert(`Feedback submitted for ${enrolledSubjects.find(s => s.id === subjectId)?.name}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Settings</h1>
        <p className="text-gray-600 mt-2">Manage your profile, feedback submissions, and preferences</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
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

      {/* Feedback Settings Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Enrolled Subjects & Feedback Status
            </h3>
            <div className="space-y-4">
              {enrolledSubjects.map((subject) => (
                <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{subject.name}</h4>
                      <p className="text-sm text-gray-600">{subject.code} • {subject.teacher}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subject.feedbackSubmitted ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Submitted</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Deadline:</span> {new Date(subject.deadline).toLocaleDateString()}
                    </div>
                    {!subject.feedbackSubmitted && (
                      <button
                        onClick={() => handleSubmitFeedback(subject.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Submit Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Submission History</h3>
            <div className="space-y-3">
              {feedbackHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.subject}</p>
                    <p className="text-sm text-gray-600">Submitted on {new Date(item.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-600" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Feedback Deadlines</p>
                  <p className="text-sm text-gray-600">Reminders to complete feedback before deadlines</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications.feedbackDeadlines}
                    onChange={(e) => handleNotificationChange('feedbackDeadlines', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Submission Confirmations</p>
                  <p className="text-sm text-gray-600">Confirmation messages after feedback submission</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications.submissionConfirmations}
                    onChange={(e) => handleNotificationChange('submissionConfirmations', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">System Updates</p>
                  <p className="text-sm text-gray-600">Notifications about system maintenance and updates</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications.systemUpdates}
                    onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
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

          {/* Login Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-gray-600" />
              Login Activity
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
                  <p className="font-medium text-gray-900">Login from Mobile App</p>
                  <p className="text-sm text-gray-500">IP: 192.168.1.101 • 1 day ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Successful</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Login from Safari on iPhone</p>
                  <p className="text-sm text-gray-500">IP: 192.168.1.102 • 3 days ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Successful</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSettings;

