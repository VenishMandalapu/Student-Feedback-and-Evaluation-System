import React, { useState } from 'react';
import { BookOpen, Plus, Search, Users, Calendar, Star } from 'lucide-react';
import { courses, users } from '../../data/mockData';

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('all');

  const faculty = users.filter(user => user.role === 'teacher');

  const courseStats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Active Faculty', value: faculty.length, icon: Users, color: 'text-green-600' },
    { label: 'Total Enrollments', value: courses.reduce((sum, course) => sum + course.students.length, 0), icon: Users, color: 'text-purple-600' },
    { label: 'Average Rating', value: '4.3/5', icon: Star, color: 'text-yellow-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-2">Manage engineering courses and faculty assignments</p>
        </div>
        <button
          onClick={() => setShowAddCourse(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {courseStats.map((stat, index) => {
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

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Semesters</option>
          <option value="fall">Fall 2025</option>
          <option value="spring">Spring 2025</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p className="text-blue-100 mt-1">{course.code}</p>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {course.semester}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">{course.teacher}</span>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{course.students.length}</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">4.{Math.floor(Math.random() * 5)}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{course.year}</div>
                  <div className="text-xs text-gray-500">Year</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium">
                  Edit Course
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium">
                  Manage Students
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Course</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Course Code (e.g., CS501)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Faculty</option>
                {faculty.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Semester</option>
                <option value="fall">Fall 2025</option>
                <option value="spring">Spring 2025</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCourse(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddCourse(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-blue-700">Bulk Import</div>
            <div className="text-sm text-gray-600">Import courses from Excel</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-green-700">Assign Faculty</div>
            <div className="text-sm text-gray-600">Bulk faculty assignments</div>
          </button>
          <button className="bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm">
            <div className="font-medium text-purple-700">Generate Reports</div>
            <div className="text-sm text-gray-600">Course analytics & insights</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
