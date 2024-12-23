import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Auth />} />
      </Routes>
    </Router>
  );
}

export default App;