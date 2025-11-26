import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import StatusPage from './pages/StatusPage';
import useSupabaseUser from './hooks/useSupabaseUser';
import Modal from './components/CommonComponents/Modal';
import Login from './components/CommonComponents/Login';
import Signup from './components/CommonComponents/Signup';
import Nav from './components/CommonComponents/Nav';

function ProtectedRoute({ children }) {
  const user = useSupabaseUser();
  if (user === undefined) return null;
  if (!user) return children; // Show current page (modal handles login)
  return children;
}

function App() {
  // State for controlling modal visibility
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Modal openers to pass to any component via props
  const openLogin = () => setShowLogin(true);
  const openSignup = () => setShowSignup(true);
  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage openLogin={openLogin} openSignup={openSignup} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage openLogin={openLogin} openSignup={openSignup} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <StatusPage openLogin={openLogin} openSignup={openSignup} />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Modal overlays (Login, Signup) */}
      <Modal open={showLogin} onClose={closeModals}>
        <Login
          switchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onClose={closeModals}
        />
      </Modal>
      <Modal open={showSignup} onClose={closeModals}>
        <Signup
          switchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onClose={closeModals}
        />
      </Modal>
    </Router>
  );
}

export default App;
