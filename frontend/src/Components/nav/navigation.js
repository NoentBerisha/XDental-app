import React, { useState, useContext } from 'react';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../../Context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function Nav({ onNavClick }) {
  const { translations } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src={`${process.env.PUBLIC_URL}/logo-icon.jpg`} alt='Logo' />
      </div>
      
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      
        <ul>
        <li onClick={() => { onNavClick('landing'); toggleMenu(); }}>
  {translations.nav.home}
</li>
<li onClick={() => { onNavClick('availability'); toggleMenu(); }}>
  {translations.nav.services}
</li>
<li onClick={() => { onNavClick('about'); toggleMenu(); }}>
  {translations.nav.about}
</li>
          
          {/* <li onClick={() => onNavClick('contact')}>{translations.nav.contact}</li> */}
        </ul>
        <LanguageSwitcher />
      </div>
      
      <div className='burger' onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
}

export default Nav;
