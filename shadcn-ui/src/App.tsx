import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Index from './pages/Index';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import DocumentUpload from './pages/DocumentUpload';
import SmartRecommendations from './pages/SmartRecommendations';
import ProfileSettings from './pages/ProfileSettings';
import ProgramManagement from './pages/ProgramManagement';
import CandidatesManagement from './pages/CandidatesManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AIRankingPage from './pages/AIRankingPage';
import WomenSafetyPage from './pages/WomenSafetyPage';
import AddAdminPage from './pages/AddAdminPage';
import ProgramDetailsPage from './pages/ProgramDetailsPage';
import NotificationCenter from './pages/NotificationCenter';
import HelpSupportPage from './pages/HelpSupportPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// Protected Route component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Dashboard Router component
function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Route based on user role
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else {
    return <Navigate to="/student" replace />;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Dashboard Router */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-ranking" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AIRankingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/program-management" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ProgramManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidates-management" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CandidatesManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AddAdminPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Routes */}
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upload-documents" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DocumentUpload />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/smart-recommendations" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <SmartRecommendations />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes */}
            <Route 
              path="/women-safety" 
              element={
                <ProtectedRoute>
                  <WomenSafetyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile-settings" 
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <NotificationCenter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/help-support" 
              element={
                <ProtectedRoute>
                  <HelpSupportPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Program Details */}
            <Route path="/program-details/:id" element={<ProgramDetailsPage />} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;