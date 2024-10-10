import React from 'react';
import logo from '../img/logoTransparent.png';
import '../assets/styles/home.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer_container container_item">
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
                <span className="fab fa-whatsapp"></span>
                <a target="_blank" href="https://wa.me/123456789"  rel="noopener noreferrer">+549123456789</a>
              </li>
              <li>
                <span className="fas fa-phone-alt"></span>
                <a target="_blank" >1154123456789</a>
              </li>
              <li>
                <span className="fas fa-envelope"></span>
                <a target="_blank" href="mailto:hola@gmail.com">GTimesheet@gt.com.ar</a>
              </li>
              <li>
                <span className="fab fa-facebook"></span>
                <a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer">@GTimesheet</a>
              </li>
              <li>
                <span className="fab fa-linkedin"></span>
                <a target="_blank" href="https://www.linkedin.com">@GTimesheet</a>
              </li>
              <li>
                <span className="fab fa-instagram"></span>
                <a target="_blank" href="https://www.instagram.com/">@GTimesheet</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='footer_copyright'>
          <p>© 2024 Generación T - Equipo Thompson. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;