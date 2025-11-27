import React, { useState, useMemo } from 'react';
import { User, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authAPI } from '../services/api';
import { users, studentsData } from '../data/mockData';

const Login = () => {
  const { selectedRole, setCurrentUser, setCurrentPage } = useApp();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Departments from mock data
  const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];

  // Filtered users based on selections
  const filteredUsers = useMemo(() => {
    if (selectedRole === 'student') {
      return studentsData.filter(student =>
        (!selectedDepartment || student.department === selectedDepartment) &&
        (!selectedYear || student.year.toString() === selectedYear) &&
        (!selectedSemester || student.semester.toString() === selectedSemester)
      ).map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
        year: student.year,
        semester: student.semester
      }));
    } else if (selectedRole === 'teacher') {
      return users.filter(user =>
        user.role === 'teacher' &&
        (!selectedDepartment || user.department === selectedDepartment)
      );
    } else {
      return users.filter(user => user.role === 'admin');
    }
  }, [selectedRole, selectedDepartment, selectedYear, selectedSemester]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const selectedUser = users.find(u => u.email === selectedEmail);
      if (!selectedUser) {
        setError('Please select all required fields');
        setLoading(false);
        return;
      }

      let role;
      let dashboardPage;

      if (selectedRole === 'student') {
        role = 'STUDENT';
        dashboardPage = 'student-dashboard';
      } else if (selectedRole === 'teacher') {
        role = 'TEACHER';
        dashboardPage = 'teacher-dashboard';
      } else {
        role = 'ADMIN';
        dashboardPage = 'admin-dashboard';
      }

      const response = await authAPI.login({
        email: selectedUser.email,
        password,
        role
      });

      // Store token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Set user in context
      setCurrentUser(response.data.user);
      setCurrentPage(dashboardPage);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (selectedRole) {
      case 'student': return 'Student Login';
      case 'teacher': return 'Teacher Login';
      case 'admin': return 'Admin Login';
      default: return 'Login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <button 
              onClick={() => setCurrentPage('role-selection')}
              className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Back to role selection"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className={`w-16 h-16 ${
              selectedRole === 'student' ? 'bg-blue-100' :
              selectedRole === 'teacher' ? 'bg-green-100' : 'bg-purple-100'
            } rounded-full flex items-center justify-center mx-auto mb-4`}>
              <User className={`w-8 h-8 ${
                selectedRole === 'student' ? 'text-blue-600' :
                selectedRole === 'teacher' ? 'text-green-600' : 'text-purple-600'
              }`} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">{getRoleTitle()}</h2>
            <p className="text-gray-600 mt-2">Select your details and enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {selectedRole !== 'admin' && (
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedEmail(''); // Reset email when department changes
                  }}
                  className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                    selectedRole === 'student' ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  }`}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedRole === 'student' && (
              <>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value);
                      setSelectedEmail(''); // Reset email when year changes
                    }}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Year</option>
                    {[1, 2, 3, 4].map(year => (
                      <option key={year} value={year}>{year} Year</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    id="semester"
                    value={selectedSemester}
                    onChange={(e) => {
                      setSelectedSemester(e.target.value);
                      setSelectedEmail(''); // Reset email when semester changes
                    }}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  id="email"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                    selectedRole === 'student' ? 'focus:ring-blue-500' :
                    selectedRole === 'teacher' ? 'focus:ring-green-500' : 'focus:ring-purple-500'
                  }`}
                  required
                  disabled={selectedRole === 'student' && (!selectedDepartment || !selectedYear || !selectedSemester)}
                >
                  <option value="">
                    {selectedRole === 'student' && (!selectedDepartment || !selectedYear || !selectedSemester)
                      ? 'Select department, year, and semester first'
                      : 'Select your email'
                    }
                  </option>
                  {filteredUsers.map(user => (
                    <option key={user.email} value={user.email}>
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                    selectedRole === 'student' ? 'focus:ring-blue-500' :
                    selectedRole === 'teacher' ? 'focus:ring-green-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter password (any password works)"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedEmail}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors flex items-center justify-center ${
                selectedRole === 'student' ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400' :
                selectedRole === 'teacher' ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400' : 
                'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
