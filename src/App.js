// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Updateprofile from './components/Updateprofile';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={isAuthenticated ? <Todo /> : <Navigate to="/login" />} />
            <Route path="/update-profile" element={<Updateprofile />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    
  );
};

export default App;


