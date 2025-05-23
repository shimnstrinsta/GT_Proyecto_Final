import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import InsertPage from '../pages/InsertHourPage'
import ManageHourPage from '../pages/ManageHourPage'
import UserAccount from '../pages/UserAccount'
import SupervisorHomePage from '../pages/SupervisorHomePage'
import SupervisorHourPage from '../pages/SupervisorHourPage'
import ProjectsPage from '../pages/ProjectsPage'
import EmployeePage from '../pages/EmployeePage';


export default function Routing() {
  return (    
    <Router>
        <Routes>
          {/* Cambiar el uso de `component` a `element` */}
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<LoginPage />} /> 
          <Route exact path="/home" element={<HomePage />} /> 
          <Route exact path="/hour/insert" element={<InsertPage />} />           

          <Route exact path="/hour" element={<ManageHourPage />} /> 
          <Route exact path="/user" element={<UserAccount />} /> 

          <Route exact path="/supervisor/home" element={<SupervisorHomePage />} /> 
          <Route exact path="/supervisor/hour" element={<SupervisorHourPage />} /> 
          <Route exact path="/project" element={<ProjectsPage />} /> 

          <Route exact path="/supervisor/employee" element={<EmployeePage />} /> 

          
        </Routes>
    </Router>
  
  )
}
