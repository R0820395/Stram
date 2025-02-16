import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import StravaLogin from './components/StravaLogin';
import StravaCallback from './components/StravaCallback';
import StravaData from './components/StravaData';
import Map from './components/Map';

function App() {
  const [activities, setActivities] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('strava_access_token')
  );

  useEffect(() => {
    console.log('Authentication state:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
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
    </Router>
  );
}

export default App;
