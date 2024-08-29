import React, { useEffect, useRef, useContext } from "react";
import CarouselComponent from "../Carousel/Carousel";
import './LandingPage.css';
import { LanguageContext } from '../../Context/LanguageContext';

function LandingPage() {
  const sectionRef = useRef(null);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const section = sectionRef.current;

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div>
      <CarouselComponent />

      <main>
        <section className="fading-section" ref={sectionRef}>
          <div className="container">
            <div className="row">
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto1Ordinanc.jpg`} alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle1}</h2>
                <p>{translations.landingPage.serviceDescription1}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle2}</h2>
                <p>{translations.landingPage.serviceDescription2}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto2Ordinanc.jpg`} alt="Sample Image" />
              </div>
            </div>

            <div className="row">
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto3Ordinanc.jpg`} alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle3}</h2>
                <p>{translations.landingPage.serviceDescription3}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle4}</h2>
                <p>{translations.landingPage.serviceDescription4}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto4Ordinanc.jpg`} alt="Sample Image" />
              </div>
            </div>

            <div className="row">
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto5Ordinanc.jpg`} alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle1}</h2>
                <p>{translations.landingPage.serviceDescription1}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>{translations.landingPage.serviceTitle2}</h2>
                <p>{translations.landingPage.serviceDescription2}</p>
                <a href="#" className="button">{translations.landingPage.learnMore}</a>
              </div>
              <div className="image-column">
                <img src={`${process.env.PUBLIC_URL}/Foto6Ordinanc.jpg`} alt="Sample Image" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;