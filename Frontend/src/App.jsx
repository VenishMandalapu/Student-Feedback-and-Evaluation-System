import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppProvider, useApp } from './context/AppContext';
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
import Sidebar from './components/shared/Sidebar';
import Header from './components/shared/Header';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import StudentSettings from './components/student/StudentSettings';
import GiveFeedback from './components/student/GiveFeedback';
import ViewResults from './components/student/ViewResults';
import Deadlines from './components/student/Deadlines';
import MyCourses from './components/student/MyCourses';

// Teacher Components
import TeacherDashboard from './components/teacher/TeacherDashboard';
import TeacherSettings from './components/teacher/TeacherSettings';
import TeacherCourses from './components/teacher/TeacherCourses';
import FeedbackResults from './components/teacher/FeedbackResults';
import ImprovementSuggestions from './components/teacher/ImprovementSuggestions';
import StudentInsights from './components/teacher/StudentInsights';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSettings from './components/admin/AdminSettings';
import FacultyManagement from './components/admin/FacultyManagement';
import CourseManagement from './components/admin/CourseManagement';
import FeedbackForms from './components/admin/FeedbackForms';
import DecisionMaking from './components/admin/DecisionMaking';
import Reports from './components/admin/Reports';
import StudentManagement from './components/admin/StudentManagement';

const AppContent = () => {
  const { currentPage } = useApp();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentUser = useSelector((state) => state.user.currentUser);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'role-selection':
        return <RoleSelection />;
      case 'login':
        return <Login />;
      case 'student-dashboard':
        return isAuthenticated ? <DashboardLayout><StudentDashboard /></DashboardLayout> : <Login />;
      case 'student-give-feedback':
        return isAuthenticated ? <DashboardLayout><GiveFeedback /></DashboardLayout> : <Login />;
      case 'student-view-results':
        return isAuthenticated ? <DashboardLayout><ViewResults /></DashboardLayout> : <Login />;
      case 'student-deadlines':
        return isAuthenticated ? <DashboardLayout><Deadlines /></DashboardLayout> : <Login />;
      case 'student-my-courses':
        return isAuthenticated ? <DashboardLayout><MyCourses /></DashboardLayout> : <Login />;
      case 'student-settings':
        return isAuthenticated ? <DashboardLayout><StudentSettings /></DashboardLayout> : <Login />;
      case 'teacher-dashboard':
        return isAuthenticated ? <DashboardLayout><TeacherDashboard /></DashboardLayout> : <Login />;
      case 'teacher-courses':
        return isAuthenticated ? <DashboardLayout><TeacherCourses /></DashboardLayout> : <Login />;
      case 'teacher-feedback-results':
        return isAuthenticated ? <DashboardLayout><FeedbackResults /></DashboardLayout> : <Login />;
      case 'teacher-improvement-suggestions':
        return isAuthenticated ? <DashboardLayout><ImprovementSuggestions /></DashboardLayout> : <Login />;
      case 'teacher-student-insights':
        return isAuthenticated ? <DashboardLayout><StudentInsights /></DashboardLayout> : <Login />;
      case 'teacher-settings':
        return isAuthenticated ? <DashboardLayout><TeacherSettings /></DashboardLayout> : <Login />;
      case 'admin-dashboard':
        return isAuthenticated ? <DashboardLayout><AdminDashboard /></DashboardLayout> : <Login />;
      case 'admin-faculty-management':
        return isAuthenticated ? <DashboardLayout><FacultyManagement /></DashboardLayout> : <Login />;
      case 'admin-course-management':
        return isAuthenticated ? <DashboardLayout><CourseManagement /></DashboardLayout> : <Login />;
      case 'admin-feedback-forms':
        return isAuthenticated ? <DashboardLayout><FeedbackForms /></DashboardLayout> : <Login />;
      case 'admin-decision-making':
        return isAuthenticated ? <DashboardLayout><DecisionMaking /></DashboardLayout> : <Login />;
      case 'admin-reports':
        return isAuthenticated ? <DashboardLayout><Reports /></DashboardLayout> : <Login />;
      case 'admin-student-management':
        return isAuthenticated ? <DashboardLayout><StudentManagement /></DashboardLayout> : <Login />;
      case 'admin-settings':
        return isAuthenticated ? <DashboardLayout><AdminSettings /></DashboardLayout> : <Login />;
      default:
        return <LandingPage />;
    }
  };

  return renderPage();
};

const DashboardLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={currentUser.role} />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Provider>
  );
}

export default App;
