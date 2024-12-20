import React, { useContext, useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Image } from 'semantic-ui-react';
import logo from '../img/logoHeader2.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/UserService';
import '../assets/styles/main.css';
import '../assets/styles/header.css';


const settings = ['Perfil', 'Cerrar sesión'];


export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [photo_link, setPhotoLink] = useState(("https://via.placeholder.com/150"))  
  const [url_,setUrl] = useState("/home")

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("id_user");
    localStorage.removeItem("supervisor");    
    navigate("/");
    setAnchorElUser(null);
  }

  const handleCloseUserMenu = () => {
    navigate("/user")
    setAnchorElUser(null);
  };
  
  useEffect(() => {
    fetchUserData();
    if(localStorage.getItem("supervisor")){
      setUrl("/supervisor/home")
    }
  }, []);
  
  const fetchUserData = async () => {
    try {
      await userService.getEmployee()
      .then(response =>{

        if (response.success) {
          setPhotoLink(response.employee.ruta_foto)
        }
         else {
          alert("No se pudo obtener tus datos de usuario, por favor intentá más tarde");
        }
      })
      
    } 
    catch (error) {
      alert("No se pudo obtener la información del usuario: " + error.message);
    }
  };






  return (
    <Box sx={{ width: '100%', mt: 2 }} >
      <AppBar position="fixed" color="transparent" sx={{ backgroundColor: "#14ae5c" }}>
        <Container maxWidth="xl" >

          <Toolbar disableGutters className='container_items'>
            <Link to={url_}><Image src={logo} size='small' style={{ height: '100px' }} /></Link>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/*<Avatar alt="Remy Sharp" src="https://scontent-eze1-1.xx.fbcdn.net/v/t31.18172-8/12593697_965652153528159_2475054300731810535_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=53a332&_nc_ohc=rlKIf_jt2y0Q7kNvgFHdS1v&_nc_ht=scontent-eze1-1.xx&_nc_gid=AJsaVXVmW3lKx5-hYG2ExBy&oh=00_AYBy9mWkYhB7oj2zeiRiwWjU7fYZp0DXCYMFqHtg0w7a_g&oe=67276969" />*/}
                  <p>{localStorage.getItem("name")}</p>
                  <Avatar alt="Remy Sharp" src={photo_link} />
                  
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Cerrar sesión' ? handleLogout : handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

