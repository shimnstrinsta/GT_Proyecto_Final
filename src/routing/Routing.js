import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import {UserProvider} from '../context/UserContext';

export default function Routing() {
  return (
    <UserProvider>
    <Router>
        <Routes>
          {/* Cambiar el uso de `component` a `element` */}
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<LoginPage />} /> 
          <Route exact path="/home" element={<HomePage />} /> 

        </Routes>
    </Router>
    </UserProvider>
  )
}
