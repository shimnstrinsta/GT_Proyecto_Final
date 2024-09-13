import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

export default function Routing() {
  return (
    <Router>
        <Routes>
          {/* Cambiar el uso de `component` a `element` */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/home" element={<HomePage />} /> 

        </Routes>
    </Router>
   
  )
}
