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

// Convert studentsData to Student format with additional fields
const convertToStudentFormat = () => {
  return studentsData.map(s => ({
    id: s.id,
    rollNo: s.rollNo,
    name: s.name,
    email: s.email,
    phone: '+91-' + Math.floor(Math.random() * 9000000000 + 1000000000),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    department: s.department,
    course: `B.Tech ${s.department}`,
    year: s.year,
    semester: s.semester,
    section: String.fromCharCode(65 + Math.floor(Math.random() * 3)), // A, B, or C
    admissionYear: 2025 - s.year,
    dob: `200${Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    status: 'active',
    createdAt: `${2025 - s.year}-08-01`,
    updatedAt: '2025-01-15',
    feedbackStatus: s.performance >= 80 ? 'completed' : s.performance >= 60 ? 'pending' : 'not_started',
    assignedSubjects: s.assignedCourses,
    performance: s.performance,
    attendance: s.attendance
  }));
};

const StudentManagement = () => {
  const { currentUser } = useApp();
  const [students, setStudents] = useState(convertToStudentFormat());
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
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
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';

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
  const handleSort = (key) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (showAddModal) {
      // Add new student
      const newStudent = {
        id: String(students.length + 1),
        rollNo: formData.rollNo,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        department: formData.department,
        course: formData.course,
        year: formData.year,
        semester: formData.semester,
        section: formData.section,
        admissionYear: formData.admissionYear,
        dob: formData.dob,
        address: formData.address,
        status: formData.status,
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
  const handleExport = (format) => {
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
              data={departments.map(dept => ({
                label: dept.split(' ')[0],
                value: students.filter(s => s.department === dept).length
              }))}
              className="shadow-sm border border-gray-100"
            />

            <Chart
              type="pie"
              title="Students by Year"
              data={[
                { label: '1st Year', value: students.filter(s => s.year === 1).length },
                { label: '2nd Year', value: students.filter(s => s.year === 2).length },
                { label: '3rd Year', value: students.filter(s => s.year === 3).length },
                { label: '4th Year', value: students.filter(s => s.year === 4).length }
              ]}
              className="shadow-sm border border-gray-100"
            />
          </div>
        </div>
      )}

      {/* Manage Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year/Sem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map(student => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.year}/{student.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => { setSelectedStudent(student); setShowEditModal(true); setFormData(student); }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button onClick={() => { setSelectedStudent(student); setShowDeleteModal(true); }} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredStudents.length} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of <span className="font-medium">{filteredStudents.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <ChevronUp className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredStudents.length} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {(showAddModal || showEditModal) && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {showAddModal ? 'Add New Student' : 'Edit Student'}
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Name" className="col-span-2" required />
                        <input type="text" name="rollNo" value={formData.rollNo} onChange={(e) => setFormData({...formData, rollNo: e.target.value})} placeholder="Roll No" required />
                        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" required />
                        <input type="text" name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone" />
                        <select name="gender" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <select name="department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required>
                          <option value="">Select Department</option>
                          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                        </select>
                        <select name="course" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} required>
                          <option value="">Select Course</option>
                          {coursesList.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input type="number" name="year" value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} placeholder="Year" required />
                        <input type="number" name="semester" value={formData.semester} onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})} placeholder="Semester" required />
                        <input type="text" name="section" value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})} placeholder="Section" />
                        <input type="number" name="admissionYear" value={formData.admissionYear} onChange={(e) => setFormData({...formData, admissionYear: Number(e.target.value)})} placeholder="Admission Year" />
                        <input type="date" name="dob" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} placeholder="Date of Birth" />
                        <textarea name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Address" className="col-span-2" />
                        <select name="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                  </button>
                  <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Archive Student
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to archive this student? This action can be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
                  Archive
                </button>
                <button type="button" onClick={() => setShowDeleteModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;

