import React, {useContext} from 'react';
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
import '../assets/styles/header.css';
import logo from '../img/logoHeader2.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const settings = ['Perfil', 'Cerrar sesión'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);  
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () =>{
    localStorage.removeItem("user");
    navigate("/");
    setAnchorElUser(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ width: '100%', mt:2}} >      
    <AppBar position="fixed" color="transparent" sx={{backgroundColor:"#14ae5c"}}>
      <Container maxWidth="xl" >
        
        <Toolbar disableGutters className = 'header_container_items'>          
          <Link to="/home"><Image src={logo} size='small' style={{ height: '100px' }}/></Link>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              
              <Box className='header_user'>
                
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>                                                  
                    <Avatar src="https://scontent.faep22-1.fna.fbcdn.net/v/t39.30808-6/246130660_10222624843502271_4081528055984388244_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=N16FntRuB7IQ7kNvgHcyjDN&_nc_ht=scontent.faep22-1.fna&_nc_gid=AdlLcfUu64Q8n_7zIQ3DZNm&oh=00_AYDozXSzcRuYhD-FgIPkI_y6_7ULTzv3nkumXlJPb17NrA&oe=66FC6763" />                  
                </IconButton>
                <p>{localStorage.getItem("user")}</p>
              </Box>
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
                <MenuItem key={setting}  onClick={setting === 'Cerrar sesión' ? handleLogout : handleCloseUserMenu}>
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

