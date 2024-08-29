import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp, faViber } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 My Website. All Rights Reserved.</p>
        <div className="social-media">
          <a href="https://www.facebook.com/yourFacebookProfile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
            facebook.com/yourFacebookProfile
          </a>
          <a href="https://www.instagram.com/yourInstagramProfile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
            @yourInstagramProfile
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="icon" />
            +1 234 567 890 (WhatsApp)
          </a>
          <a href="viber://chat?number=1234567890" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faViber} className="icon" />
            +1 234 567 890 (Viber)
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
