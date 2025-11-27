import React, { useState, useMemo } from 'react';
import {
  Users, UserPlus, Search, Filter, Download, Upload, Edit, Trash2, Eye,
  GraduationCap, Calendar, BookOpen, Mail, Phone, MapPin, Camera,
  BarChart3, PieChart, TrendingUp, AlertTriangle, CheckCircle, Clock,
  RotateCcw, ChevronUp, ChevronDown, Archive, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { users, courses, studentsData } from '../../data/mockData';
import Chart from '../shared/Chart';

// Student data structure for management
interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Other';
  department: string;
  course?: string;
  year: number;
  semester: number;
  section?: string;
  admissionYear?: number;
  dob?: string;
  address?: string;
  profileImage?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt?: string;
  updatedAt?: string;
  feedbackStatus: 'completed' | 'pending' | 'not_started';
  assignedSubjects?: string[];
  performance: number;
  attendance: number;
}

// Convert studentsData to Student format with additional fields
const convertToStudentFormat = (): Student[] => {
  return studentsData.map(s => ({
    id: s.id,
    rollNo: s.rollNo,
    name: s.name,
    email: s.email,
    phone: '+91-' + Math.floor(Math.random() * 9000000000 + 1000000000),
    gender: Math.random() > 0.5 ? 'Male' as const : 'Female' as const,
    department: s.department,
    course: `B.Tech ${s.department}`,
    year: s.year,
    semester: s.semester,
    section: String.fromCharCode(65 + Math.floor(Math.random() * 3)), // A, B, or C
    admissionYear: 2025 - s.year,
    dob: `200${Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    status: 'active' as const,
    createdAt: `${2025 - s.year}-08-01`,
    updatedAt: '2025-01-15',
    feedbackStatus: s.performance >= 80 ? 'completed' as const : s.performance >= 60 ? 'pending' as const : 'not_started' as const,
    assignedSubjects: s.assignedCourses,
    performance: s.performance,
    attendance: s.attendance
  }));
};

const StudentManagement: React.FC = () => {
  const { currentUser } = useApp();
  const [students, setStudents] = useState<Student[]>(convertToStudentFormat());
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    gender: 'Male',
    department: '',
    course: '',
    year: 1,
    semester: 1,
    section: 'A',
    admissionYear: new Date().getFullYear(),
    dob: '',
    address: '',
    status: 'active'
  });

  // Departments and courses data
  const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];
  const coursesList = [
    'B.Tech Computer Science',
    'B.Tech Mechanical Engineering',
    'B.Tech Electrical Engineering',
    'B.Tech Civil Engineering'
  ];

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
      const matchesYear = selectedYear === 'all' || student.year.toString() === selectedYear;
      const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Student] ?? '';
        const bValue = b[sortConfig.key as keyof Student] ?? '';

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [students, searchTerm, selectedDepartment, selectedYear, selectedStatus, sortConfig]);

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter(s => s.status === 'active').length;
    const newAdmissions = students.filter(s => {
      if (!s.createdAt) return false;
      const admissionDate = new Date(s.createdAt);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return admissionDate > oneMonthAgo;
    }).length;
    const feedbackPending = students.filter(s => s.feedbackStatus === 'pending' || s.feedbackStatus === 'not_started').length;
    const graduated = students.filter(s => s.year === 4 && s.semester === 8).length;

    return { total, active, newAdmissions, feedbackPending, graduated };
  }, [students]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showAddModal) {
      // Add new student
      const newStudent: Student = {
        id: String(students.length + 1),
        rollNo: formData.rollNo!,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone!,
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        department: formData.department!,
        course: formData.course!,
        year: formData.year!,
        semester: formData.semester!,
        section: formData.section!,
        admissionYear: formData.admissionYear!,
        dob: formData.dob!,
        address: formData.address,
        status: formData.status as 'active' | 'inactive' | 'archived',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        feedbackStatus: 'not_started',
        assignedSubjects: [],
        performance: 75,
        attendance: 85
      };
      setStudents([...students, newStudent]);
      setShowAddModal(false);
    } else if (showEditModal && selectedStudent) {
      // Edit existing student
      setStudents(students.map(student =>
        student.id === selectedStudent.id
          ? { ...student, ...formData, updatedAt: new Date().toISOString() }
          : student
      ));
      setShowEditModal(false);
    }

    // Reset form
    setFormData({
      name: '',
      rollNo: '',
      email: '',
      phone: '',
      gender: 'Male',
      department: '',
      course: '',
      year: 1,
      semester: 1,
      section: 'A',
      admissionYear: new Date().getFullYear(),
      dob: '',
      address: '',
      status: 'active'
    });
  };

  // Handle delete/archive
  const handleDelete = () => {
    if (selectedStudent) {
      setStudents(students.map(student =>
        student.id === selectedStudent.id
          ? { ...student, status: 'archived', updatedAt: new Date().toISOString() }
          : student
      ));
      setShowDeleteModal(false);
      setSelectedStudent(null);
    }
  };

  // Export data
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    // Mock export functionality
    alert(`Exporting ${filteredStudents.length} students as ${format.toUpperCase()}`);
  };

  // Import data
  const handleImport = () => {
    // Mock import functionality
    alert('Import functionality would open file picker here');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        <p className="text-gray-600 mt-2">Comprehensive student records management and analytics</p>
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
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
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Admissions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.newAdmissions}</p>
                </div>
                <UserPlus className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Feedback Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.feedbackPending}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Graduated</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.graduated}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Chart
              type="bar"
              title="Students by Department"
              data={[
                { label: 'Computer Science', value: students.filter(s => s.department === 'Computer Science').length },
                { label: 'Mechanical Eng.', value: students.filter(s => s.department === 'Mechanical Engineering').length },
                { label: 'Electrical Eng.', value: students.filter(s => s.department === 'Electrical Engineering').length },
                { label: 'Civil Eng.', value: students.filter(s => s.department === 'Civil Engineering').length }
              ]}
              className="shadow-sm border border-gray-100"
            />

            <Chart
              type="pie"
              title="Student Status Distribution"
              data={[
                { label: 'Active', value: stats.active },
                { label: 'Inactive', value: students.filter(s => s.status === 'inactive').length },
                { label: 'Archived', value: students.filter(s => s.status === 'archived').length }
              ]}
              className="shadow-sm border border-gray-100"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New Student</span>
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import Students</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, roll number, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Search students"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter by department"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter by year"
                >
                  <option value="all">All Years</option>
                  {[1, 2, 3, 4].map(year => (
                    <option key={year} value={year}>{year} Year</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Student</span>
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Showing {paginatedStudents.length} of {filteredStudents.length} students
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('rollNo')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                        aria-label="Sort by roll number"
                      >
                        <span>Roll No</span>
                        {sortConfig?.key === 'rollNo' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                        aria-label="Sort by student name"
                      >
                        <span>Student Name</span>
                        {sortConfig?.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year/Sem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.year}/{student.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          student.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : student.status === 'inactive'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          student.feedbackStatus === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : student.feedbackStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.feedbackStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setFormData(student);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            aria-label="Edit student"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            aria-label="Archive student"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  aria-label="Select rows per page"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {Math.ceil(filteredStudents.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(Math.ceil(filteredStudents.length / itemsPerPage), currentPage + 1))}
                  disabled={currentPage === Math.ceil(filteredStudents.length / itemsPerPage)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Chart
              type="line"
              title="Student Enrollment Trend"
              data={[
                { label: '2020', value: 120 },
                { label: '2021', value: 150 },
                { label: '2022', value: 180 },
                { label: '2023', value: 200 },
                { label: '2024', value: 220 }
              ]}
              className="shadow-sm border border-gray-100"
            />

            <Chart
              type="bar"
              title="Feedback Completion Rate by Department"
              data={[
                { label: 'CS', value: 85 },
                { label: 'ME', value: 78 },
                { label: 'EE', value: 82 },
                { label: 'CE', value: 75 }
              ]}
              className="shadow-sm border border-gray-100"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Total Students</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Active</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Feedback Rate</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Avg Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => {
                    const deptStudents = students.filter(s => s.department === dept);
                    const activeStudents = deptStudents.filter(s => s.status === 'active').length;
                    const feedbackCompleted = deptStudents.filter(s => s.feedbackStatus === 'completed').length;
                    const feedbackRate = deptStudents.length > 0 ? Math.round((feedbackCompleted / deptStudents.length) * 100) : 0;

                    return (
                      <tr key={dept} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{dept}</td>
                        <td className="py-3 px-4">{deptStudents.length}</td>
                        <td className="py-3 px-4">{activeStudents}</td>
                        <td className="py-3 px-4">{feedbackRate}%</td>
                        <td className="py-3 px-4">4.2/5</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.rollNo}
                      onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value as 'Male' | 'Female' | 'Other'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select department"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select course"
                    >
                      <option value="">Select Course</option>
                      {coursesList.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                    <select
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select year"
                    >
                      {[1, 2, 3, 4].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                    <select
                      required
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select semester"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <input
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter section"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission Year</label>
                    <input
                      type="number"
                      value={formData.admissionYear}
                      onChange={(e) => setFormData({...formData, admissionYear: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter admission year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select date of birth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Edit Student</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.rollNo}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value as 'Male' | 'Female' | 'Other'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select department"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select course"
                    >
                      <option value="">Select Course</option>
                      {coursesList.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                    <select
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select year"
                    >
                      {[1, 2, 3, 4].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                    <select
                      required
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select semester"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <input
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter section"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission Year</label>
                    <input
                      type="number"
                      value={formData.admissionYear}
                      onChange={(e) => setFormData({...formData, admissionYear: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter admission year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Select date of birth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Archive</h3>
            <p>Are you sure you want to archive student <strong>{selectedStudent.name}</strong>?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Archive
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;

