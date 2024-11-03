import Header from '../components/Header';
import Projects from '../components/Projects'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectsPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("supervisor")){
      navigate("/home")
    }
  })
  return (
    <div>
        <Header/>
        <Projects/>
    </div>
  );
}

export default ProjectsPage;
