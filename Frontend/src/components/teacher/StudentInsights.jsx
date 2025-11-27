import React, { useState, useMemo } from 'react';
import {
  Users, TrendingUp, Award, AlertCircle, Search, Filter, Download,
  BarChart3, PieChart, UserCheck, Clock, BookOpen, GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { studentsData, courses } from '../../data/mockData';
import Chart from '../shared/Chart';

const StudentInsights = () => {
  const { currentUser, selectedCourse } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPerformance, setFilterPerformance] = useState('all');
  const [filterAttendance, setFilterAttendance] = useState('all');

  // Get current course
  const currentCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourse);
  }, [selectedCourse]);

  // Get students enrolled in the selected course
  const enrolledStudents = useMemo(() => {
    if (!currentCourse) return [];
    return studentsData.filter(s => currentCourse.students.includes(s.id));
  }, [currentCourse]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    let filtered = enrolledStudents.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterPerformance !== 'all') {
      if (filterPerformance === 'excellent') {
        filtered = filtered.filter(s => s.performance >= 90);
      } else if (filterPerformance === 'good') {
        filtered = filtered.filter(s => s.performance >= 75 && s.performance < 90);
      } else if (filterPerformance === 'average') {
        filtered = filtered.filter(s => s.performance >= 60 && s.performance < 75);
      } else if (filterPerformance === 'poor') {
        filtered = filtered.filter(s => s.performance < 60);
      }
    }

    if (filterAttendance !== 'all') {
      if (filterAttendance === 'high') {
        filtered = filtered.filter(s => s.attendance >= 90);
      } else if (filterAttendance === 'medium') {
        filtered = filtered.filter(s => s.attendance >= 75 && s.attendance < 90);
      } else if (filterAttendance === 'low') {
        filtered = filtered.filter(s => s.attendance < 75);
      }
    }

    return filtered;
  }, [enrolledStudents, searchTerm, filterPerformance, filterAttendance]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = enrolledStudents.length;
    const avgPerformance = enrolledStudents.reduce((sum, s) => sum + s.performance, 0) / total || 0;
    const avgAttendance = enrolledStudents.reduce((sum, s) => sum + s.attendance, 0) / total || 0;
    const topPerformers = enrolledStudents.filter(s => s.performance >= 90).length;
    const needsAttention = enrolledStudents.filter(s => s.performance < 60 || s.attendance < 75).length;

    return {
      total,
      avgPerformance: avgPerformance.toFixed(1),
      avgAttendance: avgAttendance.toFixed(1),
      topPerformers,
      needsAttention
    };
  }, [enrolledStudents]);

  // Performance distribution data
  const performanceDistribution = useMemo(() => {
    const excellent = enrolledStudents.filter(s => s.performance >= 90).length;
    const good = enrolledStudents.filter(s => s.performance >= 75 && s.performance < 90).length;
    const average = enrolledStudents.filter(s => s.performance >= 60 && s.performance < 75).length;
    const poor = enrolledStudents.filter(s => s.performance < 60).length;

    return [
      { label: 'Excellent (90-100)', value: excellent },
      { label: 'Good (75-89)', value: good },
      { label: 'Average (60-74)', value: average },
      { label: 'Poor (<60)', value: poor }
    ];
  }, [enrolledStudents]);

  // Attendance distribution
  const attendanceDistribution = useMemo(() => {
    const high = enrolledStudents.filter(s => s.attendance >= 90).length;
    const medium = enrolledStudents.filter(s => s.attendance >= 75 && s.attendance < 90).length;
    const low = enrolledStudents.filter(s => s.attendance < 75).length;

    return [
      { label: 'High (≥90%)', value: high },
      { label: 'Medium (75-89%)', value: medium },
      { label: 'Low (<75%)', value: low }
    ];
  }, [enrolledStudents]);

  const handleExport = () => {
    alert(`Exporting data for ${filteredStudents.length} students`);
  };

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No Course Selected</h3>
          <p className="text-gray-500 mt-2">Please select a course from the login page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Insights</h1>
        <p className="text-gray-600 mt-2">
          Course: <span className="font-semibold">{currentCourse.name}</span> ({currentCourse.code})
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgPerformance}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgAttendance}%</p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.topPerformers}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.needsAttention}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="bar"
          title="Performance Distribution"
          data={performanceDistribution}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="pie"
          title="Attendance Distribution"
          data={attendanceDistribution}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Performance</option>
              <option value="excellent">Excellent (≥90)</option>
              <option value="good">Good (75-89)</option>
              <option value="average">Average (60-74)</option>
              <option value="poor">Poor (&lt;60)</option>
            </select>
            <select
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Attendance</option>
              <option value="high">High (≥90%)</option>
              <option value="medium">Medium (75-89%)</option>
              <option value="low">Low (&lt;75%)</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredStudents.length} of {enrolledStudents.length} students
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year/Sem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Year {student.year} / Sem {student.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        student.performance >= 90
                          ? 'bg-green-100 text-green-800'
                          : student.performance >= 75
                          ? 'bg-blue-100 text-blue-800'
                          : student.performance >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.performance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      student.attendance >= 90
                        ? 'bg-green-100 text-green-800'
                        : student.attendance >= 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.performance < 60 || student.attendance < 75 ? (
                      <span className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Needs Attention
                      </span>
                    ) : student.performance >= 90 && student.attendance >= 90 ? (
                      <span className="flex items-center text-green-600 text-sm">
                        <Award className="w-4 h-4 mr-1" />
                        Excellent
                      </span>
                    ) : (
                      <span className="flex items-center text-blue-600 text-sm">
                        <UserCheck className="w-4 h-4 mr-1" />
                        Good
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentInsights;
