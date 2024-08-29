import React, { useEffect, useRef } from "react";
import CarouselComponent from "../Carousel/Carousel";
import './LandingPage.css';

function LandingPage() {
  const sectionRef = useRef(null);

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
                <img src="Foto1Ordinanc.jpg" alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>Service Title 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>Service Title 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
              <div className="image-column">
                <img src="Foto2Ordinanc.jpg" alt="Sample Image" />
              </div>
            </div>

            <div className="row">
              <div className="image-column">
                <img src="Foto3Ordinanc.jpg" alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>Service Title 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>Service Title 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
              <div className="image-column">
                <img src="Foto4Ordinanc.jpg" alt="Sample Image" />
              </div>
            </div>

            <div className="row">
              <div className="image-column">
                <img src="Foto5Ordinanc.jpg" alt="Sample Image" />
              </div>
              <div className="text-column">
                <h2>Service Title 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
            </div>
            <div className="row reverse">
              <div className="text-column">
                <h2>Service Title 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus luctus elit et ligula tincidunt, sed dictum metus blandit.</p>
                <a href="#" className="button">Learn More</a>
              </div>
              <div className="image-column">
                <img src="Foto6Ordinanc.jpg" alt="Sample Image" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
