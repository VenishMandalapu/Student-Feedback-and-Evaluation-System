import React, { useState } from 'react';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { users } from '../data/mockData';

const Login: React.FC = () => {
  const { selectedRole, setCurrentUser, setCurrentPage } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - find user by role
    const user = users.find(u => u.role === selectedRole);
    if (user) {
      setCurrentUser(user);
      setCurrentPage(`${selectedRole}-dashboard`);
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

  const getDefaultCredentials = () => {
    switch (selectedRole) {
      case 'student': 
        return { email: 'venish@student.edu', password: 'student123' };
      case 'teacher': 
        return { email: 'sadhana@faculty.edu', password: 'teacher123' };
      case 'admin': 
        return { email: 'krishna@admin.edu', password: 'admin123' };
      default: 
        return { email: '', password: '' };
    }
  };

  React.useEffect(() => {
    const credentials = getDefaultCredentials();
    setEmail(credentials.email);
    setPassword(credentials.password);
  }, [selectedRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <button 
              onClick={() => setCurrentPage('role-selection')}
              className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
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
            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                selectedRole === 'student' ? 'bg-blue-600 hover:bg-blue-700' :
                selectedRole === 'teacher' ? 'bg-green-600 hover:bg-green-700' : 
                'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">
              Email: {getDefaultCredentials().email}<br />
              Password: {getDefaultCredentials().password}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;