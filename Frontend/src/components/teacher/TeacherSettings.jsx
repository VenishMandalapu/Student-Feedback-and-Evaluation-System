import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, Calendar, Eye, Bell, Key, EyeOff, Save, TrendingUp, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses, analytics } from '../../data/mockData';

const TeacherSettings = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    employeeId: 'EMP001',
    department: 'Computer Science',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newFeedback: true,
    upcomingDeadlines: true,
    systemUpdates: false
  });

  // Mock data for teacher's assigned subjects
  const assignedSubjects = [
    { id: 1, name: 'Data Structures', courseCode: 'CS201', semester: 'Fall 2024', students: 45 },
    { id: 2, name: 'Algorithms', courseCode: 'CS301', semester: 'Fall 2024', students: 38 },
    { id: 3, name: 'Database Systems', courseCode: 'CS401', semester: 'Spring 2024', students: 42 }
  ];

  // Mock feedback data for teacher's subjects only
  const feedbackInsights = [
    { subject: 'Data Structures', averageRating: 4.6, responses: 42, trend: '+0.2' },
    { subject: 'Algorithms', averageRating: 4.4, responses: 35, trend: '+0.1' },
    { subject: 'Database Systems', averageRating: 4.2, responses: 38, trend: '-0.1' }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'teaching', label: 'Teaching Details', icon: BookOpen },
    { id: 'insights', label: 'Feedback Insights', icon: TrendingUp },
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Settings</h1>
        <p className="text-gray-600 mt-2">Manage your profile, teaching details, and feedback insights</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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

      {/* Teaching Details Tab */}
      {activeTab === 'teaching' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Assigned Subjects
            </h3>
            <div className="space-y-4">
              {assignedSubjects.map((subject) => (
                <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{subject.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {subject.courseCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Semester:</span> {subject.semester}
                    </div>
                    <div>
                      <span className="font-medium">Students:</span> {subject.students}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Academic Year & Semester
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Academic Year</label>
                <input
                  type="text"
                  value="2024-2025"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                <input
                  type="text"
                  value="Fall 2024"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Eye className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-yellow-800">Access Permissions</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Teachers can only view feedback related to their assigned subjects. You cannot view other teachers' feedback or modify feedback forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Feedback Insights (Your Subjects Only)
            </h3>
            <div className="space-y-4">
              {feedbackInsights.map((insight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{insight.subject}</h4>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-lg">{insight.averageRating}</span>
                      <span className={`text-sm font-medium ${insight.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.trend}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Responses:</span> {insight.responses}
                    </div>
                    <div>
                      <span className="font-medium">Trend:</span> {insight.trend.startsWith('+') ? 'Improving' : 'Declining'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparative Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Current Semester vs Previous Semester</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-600">+8.5% improvement</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Average Rating Trend</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-600">+0.15 points</span>
                </div>
              </div>
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
                  <p className="font-medium text-gray-900">New Feedback Submissions</p>
                  <p className="text-sm text-gray-600">Get notified when students submit feedback for your subjects</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications.newFeedback}
                    onChange={(e) => handleNotificationChange('newFeedback', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Upcoming Feedback Deadlines</p>
                  <p className="text-sm text-gray-600">Reminders about feedback collection periods</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications.upcomingDeadlines}
                    onChange={(e) => handleNotificationChange('upcomingDeadlines', e.target.checked)}
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

          {/* Login History */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-gray-600" />
              Login History
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
                  <p className="font-medium text-gray-900">Login from Firefox on Windows</p>
                  <p className="text-sm text-gray-500">IP: 192.168.1.100 • 3 days ago</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Failed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSettings;

