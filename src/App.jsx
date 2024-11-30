import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import BusinessList from './components/business/BusinessList';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminPanel from './components/admin/AdminPanel';
import { useAuth } from './contexts/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<BusinessList />} />
              <Route path="/login" element={
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Login</h2>
                  <LoginForm />
                </div>
              } />
              <Route path="/register" element={
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Register</h2>
                  <RegisterForm />
                </div>
              } />
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;