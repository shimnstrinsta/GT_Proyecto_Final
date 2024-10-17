import React from 'react';
import logo from '../img/logoTransparent.png';
import '../assets/styles/footer.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer>
      <div className="footer_container ">
        <div className="footer_logo">
        <img src={logo} alt="logo" />
        </div>
        <div className="footer_content">
          <div className="footer_links">
            <h6>Enlaces útiles</h6>
            <ul>
              <li><a target="_blank" href="/privacidad">Política de privacidad</a></li>
              <li><a target="_blank" href="/terminos">Términos y condiciones</a></li>
              <li><a target="_blank" href="/soporte">Soporte</a></li>
            </ul>
          </div>
          <div className="footer_contact">
            <h6>Contacto</h6>
            <ul>
              <li>
                <span><WhatsAppIcon /></span>
                
                <a target="_blank" href="https://wa.me/123456789" rel="noopener noreferrer">+549123456789</a>
              </li>
              <li>
                <span><PhoneIcon /></span>
                <a target="_blank" >1154123456789</a>
              </li>
              <li>
              <span><EmailIcon /></span>
                <a target="_blank" href="mailto:hola@gmail.com">GTimesheet@gt.com.ar</a>
              </li>
              <li>
              <span><FacebookIcon /></span>
                <a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer">@GTimesheet</a>
              </li>
              <li>
              <span><LinkedInIcon /></span>
                <a target="_blank" href="https://www.linkedin.com">@GTimesheet</a>
              </li>
              <li>
              <span><InstagramIcon /></span>
                <a target="_blank" href="https://www.instagram.com/">@GTimesheet</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_copyright">
          <span><p>© 2024 Generación T - Equipo Thompson. Todos los derechos reservados.</p></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;