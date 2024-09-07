import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export default function Routing() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<LoginPage/>}/>            
        </Routes>
    </Router>
  )
}
