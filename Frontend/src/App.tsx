import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppProvider, useApp } from './context/AppContext';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
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
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/give-feedback" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <GiveFeedback />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/view-results" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <ViewResults />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/deadlines" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <Deadlines />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/my-courses" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <MyCourses />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/settings" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <StudentSettings />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Protected Teacher Routes */}
      <Route path="/teacher/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <TeacherDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/courses" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <TeacherCourses />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/feedback-results" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <FeedbackResults />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/improvement-suggestions" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <ImprovementSuggestions />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/student-insights" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <StudentInsights />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/settings" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <TeacherSettings />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Protected Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/faculty-management" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <FacultyManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/course-management" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <CourseManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/feedback-forms" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <FeedbackForms />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/student-management" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <StudentManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <AdminSettings />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; isAuthenticated: boolean }> = ({
  children,
  isAuthenticated
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </Provider>
  );
}

export default App;