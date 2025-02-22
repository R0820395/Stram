import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import StravaLogin from './components/StravaLogin';
import StravaCallback from './components/StravaCallback';
import StravaData from './components/StravaData';
import Map from './components/Map';

function App() {
  const [activities, setActivities] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('strava_access_token');
    console.log('Initial auth state:', !!token);
    return !!token;
  });

  useEffect(() => {
    console.log('Authentication state updated:', isAuthenticated);
  }, [isAuthenticated]);

  const updateAuthState = (state) => {
    console.log('Updating auth state to:', state);
    setIsAuthenticated(state);
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={updateAuthState}
        activities={activities}
        setActivities={setActivities}
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, activities, setActivities }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AppContent: isAuthenticated changed to', isAuthenticated);
    if (isAuthenticated) {
      console.log('Redirecting to home page');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/callback" element={<StravaCallback setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={
          isAuthenticated ? (
            <>
              <StravaData setActivities={setActivities} />
              <Map activities={activities} />
            </>
          ) : (
            <StravaLogin />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
