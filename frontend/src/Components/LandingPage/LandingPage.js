import React, { useEffect, useRef, useContext } from "react";
import CarouselComponent from "../Carousel/Carousel";
import './LandingPage.css';
import { LanguageContext } from '../../Context/LanguageContext';

function LandingPage() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const threshold = window.innerWidth < 768 ? 0.2 : 0.5; // Adjust threshold for small screens

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: threshold
    });

    rowRefs.current.forEach(row => {
      if (row) {
        observer.observe(row);
      }
    });

    return () => {
      rowRefs.current.forEach(row => {
        if (row) {
          observer.unobserve(row);
        }
      });
    };
  }, []);

  return (
    <div>
      <CarouselComponent />

      <main>
        <section className="fading-section" ref={sectionRef}>
          <div className="container">
            {[
              { img: 'Foto1Ordinanc.jpg', title: translations.landingPage.serviceTitle1, desc: translations.landingPage.serviceDescription1 },
              { img: 'Foto2Ordinanc.jpg', title: translations.landingPage.serviceTitle2, desc: translations.landingPage.serviceDescription2 },
              { img: 'Foto3Ordinanc.jpg', title: translations.landingPage.serviceTitle3, desc: translations.landingPage.serviceDescription3 },
              { img: 'Foto4Ordinanc.jpg', title: translations.landingPage.serviceTitle4, desc: translations.landingPage.serviceDescription4 },
              { img: 'Foto5Ordinanc.jpg', title: translations.landingPage.serviceTitle1, desc: translations.landingPage.serviceDescription1 },
              { img: 'Foto6Ordinanc.jpg', title: translations.landingPage.serviceTitle2, desc: translations.landingPage.serviceDescription2 }
            ].map((item, index) => (
              <div className={`row fade-in ${index % 2 === 1 ? 'reverse' : ''}`} ref={el => rowRefs.current[index] = el} key={index}>
                <div className="image-column">
                  <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt="Sample Image" />
                </div>
                <div className="text-column">
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <a href="#" className="button">{translations.landingPage.learnMore}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;