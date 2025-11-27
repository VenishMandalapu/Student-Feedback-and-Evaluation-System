import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  BookOpen,
  MessageSquare,
  Calendar,
  Award,
  TrendingUp,
  UserCheck,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ role }) => {
  const { currentPage, setCurrentPage, setCurrentUser, setCurrentPage: setPage } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('role-selection');
  };

  const getMenuItems = () => {
    switch (role) {
      case 'student':
        return [
          { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'give-feedback', label: 'Give Feedback', icon: MessageSquare },
          { id: 'view-results', label: 'View Results', icon: BarChart3 },
          { id: 'deadlines', label: 'Deadlines', icon: Calendar },
          { id: 'my-courses', label: 'My Courses', icon: BookOpen },
          { id: 'student-settings', label: 'Settings', icon: Settings }
        ];
      case 'teacher':
        return [
          { id: 'teacher-dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'my-courses', label: 'My Courses', icon: BookOpen },
          { id: 'feedback-results', label: 'Feedback Results', icon: BarChart3 },
          { id: 'improvement-suggestions', label: 'Improvement Tips', icon: TrendingUp },
          { id: 'student-performance', label: 'Student Insights', icon: Award },
          { id: 'teacher-settings', label: 'Settings', icon: Settings }
        ];
      case 'admin':
        return [
          { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'faculty-management', label: 'Faculty Management', icon: Users },
          { id: 'course-management', label: 'Course Management', icon: BookOpen },
          { id: 'feedback-forms', label: 'Feedback Forms', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'student-management', label: 'Student Management', icon: GraduationCap },
          { id: 'admin-settings', label: 'Settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="h-screen w-64 bg-white shadow-lg fixed left-0 top-0 z-40">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          {role === 'student' ? 'Student Portal' : 
           role === 'teacher' ? 'Teacher Portal' : 
           'Admin Portal'}
        </h2>
        <p className="text-sm text-gray-500">Academic Year 2025</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
