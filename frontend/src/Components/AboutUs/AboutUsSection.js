import React, { useContext } from "react";
import FlipComponent from "./FlipComponent";
import "./AboutUsSection.css";
import { LanguageContext } from "../../Context/LanguageContext";

const AboutUsSection = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="about-us-section">
      <h1>{translations.aboutUs.title}</h1>
      <div className="flip-cards-container">
        <FlipComponent
          image="Leonard Frrokaj image.jpg"
          name="Dr. Leonard Frrokaj"
          description={translations.aboutUs.leonard.description}
          bio={translations.aboutUs.leonard.bio}
          diplomas={["Leonard Frrokaj image.jpg", "Leonard Frrokaj image.jpg"]}
          specializations={translations.aboutUs.leonard.specializations}
          otherInfo={translations.aboutUs.leonard.otherInfo}
        />
        <FlipComponent
          image="Benhard Frrokaj image.jpg"
          name="Dr. Benhard Frrokaj"
          description={translations.aboutUs.benhard.description}
          bio={translations.aboutUs.benhard.bio}
          diplomas={["Benhard Frrokaj image.jpg", "Benhard Frrokaj image.jpg"]}
          specializations={translations.aboutUs.benhard.specializations}
          otherInfo={translations.aboutUs.benhard.otherInfo}
        />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="Location">
        <h2>{translations.aboutUs.location.title}</h2>
        <p>{translations.aboutUs.location.address}</p>
        <p>{translations.aboutUs.location.phone}</p>
        <p>{translations.aboutUs.location.email}</p>
        <br></br>

        <div className="Map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1858.692176784812!2d20.429221491290303!3d42.383377809328785!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2shu!4v1724884425391!5m2!1sen!2shu"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="WorkingHours">
          <h2>{translations.aboutUs.workingHours.title}</h2>
          <p>{translations.aboutUs.workingHours.days}</p>
          <p>{translations.aboutUs.workingHours.hours}</p>
        </div>

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default AboutUsSection;
