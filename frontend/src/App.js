import React, {useState} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from './Context/LanguageContext';
import Navigation from './Components/nav/navigation';
import LandingPage from './Components/LandingPage/LandingPage';
import AboutUsSection from './Components/AboutUs/AboutUsSection';
import Footer from './Components/Footer/Footer';
import ServiceSection from './Components/Service/ServiceSection/ServiceSection';
import ContactUsSection from './Components/ContactUs/ContactUsSection';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  const handleNavigationClick = (view) => {
    setCurrentView(view);
  };
  return (
    <div>
      <ToastContainer />
    <LanguageProvider>
      
      <div>
        <Navigation onNavClick={handleNavigationClick}/>
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'about' && <AboutUsSection />}
        {currentView === 'availability' && <ServiceSection />}
        {currentView === 'contact' && <ContactUsSection />}

        <Footer />
      </div>
    </LanguageProvider>
    </div>
  );
}

export default App;
