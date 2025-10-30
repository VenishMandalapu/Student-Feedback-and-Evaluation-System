import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
import Analytics from './components/admin/Analytics';
import DecisionMaking from './components/admin/DecisionMaking';
import Reports from './components/admin/Reports';
import StudentManagement from './components/admin/StudentManagement';

const AppContent: React.FC = () => {
  const { currentPage, currentUser } = useApp();

  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  if (currentPage === 'role-selection') {
    return <RoleSelection />;
  }

  if (currentPage === 'login') {
    return <Login />;
  }

  if (!currentUser) {
    return <RoleSelection />;
  }

  const renderPage = () => {
    switch (currentPage) {
      // Student Pages
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'student-settings':
        return <StudentSettings />;
      case 'give-feedback':
        return <GiveFeedback />;
      case 'view-results':
        return <ViewResults />;
      case 'deadlines':
        return <Deadlines />;
      case 'my-courses':
        return <MyCourses />;

      // Teacher Pages
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'teacher-settings':
        return <TeacherSettings />;
      case 'teacher-courses':
        return <TeacherCourses />;
      case 'feedback-results':
        return <FeedbackResults />;
      case 'improvement-suggestions':
        return <ImprovementSuggestions />;
      case 'student-performance':
        return <StudentInsights />;

      // Admin Pages
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-settings':
        return <AdminSettings />;
      case 'faculty-management':
        return <FacultyManagement />;
      case 'course-management':
        return <CourseManagement />;
      case 'feedback-forms':
        return <FeedbackForms />;
      case 'analytics':
        return <Analytics />;
      case 'decision-making':
        return <DecisionMaking />;
      case 'reports':
        return <Reports />;
      case 'student-management':
        return <StudentManagement />;

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={currentUser.role} />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;