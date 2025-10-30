import React, { useState } from 'react';
import { Users, UserCheck, UserX, Plus, Search, Filter, Mail, Phone } from 'lucide-react';
import { users, courses } from '../../data/mockData';

const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  const faculty = users.filter(user => user.role === 'teacher');
  const pendingApprovals = [
    { id: '9', name: 'Dr. Priya Sharma', email: 'priya@faculty.edu', specialization: 'Machine Learning', status: 'pending' },
    { id: '10', name: 'Prof. Raj Kumar', email: 'raj@faculty.edu', specialization: 'Software Engineering', status: 'pending' }
  ];

  const handleApproveFaculty = (facultyId: string) => {
    console.log('Approving faculty:', facultyId);
    // In a real app, this would make an API call
  };

  const handleRejectFaculty = (facultyId: string) => {
    console.log('Rejecting faculty:', facultyId);
    // In a real app, this would make an API call
  };

  const getFacultyCourses = (facultyId: string) => {
    return courses.filter(course => course.teacherId === facultyId);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600 mt-2">Manage faculty members, approvals, and course assignments</p>
        </div>
        <button
          onClick={() => setShowAddFaculty(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Faculty</span>
        </button>
      </div>

      {/* Faculty Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Faculty', value: faculty.length, icon: Users, color: 'text-blue-600' },
          { label: 'Pending Approvals', value: pendingApprovals.length, icon: UserCheck, color: 'text-yellow-600' },
          { label: 'Active Courses', value: courses.length, icon: Users, color: 'text-green-600' },
          { label: 'Average Rating', value: '4.3/5', icon: UserCheck, color: 'text-purple-600' }
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

      {/* Pending Approvals */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Faculty Approvals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingApprovals.map((pending) => (
            <div key={pending.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-yellow-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{pending.name}</h3>
                  <p className="text-gray-600">{pending.specialization}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                  PENDING
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {pending.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleApproveFaculty(pending.id)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleRejectFaculty(pending.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <UserX className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Faculty List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Current Faculty</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faculty.map((member) => {
            const memberCourses = getFacultyCourses(member.id);
            return (
              <div key={member.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.email}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    ACTIVE
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Assigned Courses ({memberCourses.length})</h4>
                  <div className="space-y-1">
                    {memberCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="text-sm text-gray-600">
                        • {course.name} ({course.code})
                      </div>
                    ))}
                    {memberCourses.length > 3 && (
                      <div className="text-sm text-blue-600">
                        +{memberCourses.length - 3} more courses
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{memberCourses.reduce((sum, course) => sum + course.students.length, 0)}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">4.{Math.floor(Math.random() * 5)}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{memberCourses.length}</div>
                    <div className="text-xs text-gray-500">Courses</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                    Edit Details
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Assign Courses
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Faculty</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Specialization"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddFaculty(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddFaculty(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;