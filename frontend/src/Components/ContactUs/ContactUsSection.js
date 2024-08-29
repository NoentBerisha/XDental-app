import React, { useContext } from "react";
import "./ContactUsSection.css"; // Assuming you have a CSS file for styling
import { LanguageContext } from "../../Context/LanguageContext";

const ContactUsSection = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <div className="ContactUs">
      <h2>{translations.contactUs.title}</h2>

      <div className="ContactInfo">
        <h3>{translations.contactUs.phone.title}</h3>
        <p>{translations.contactUs.phone.number}</p>
      </div>

      <div className="ContactInfo">
        <h3>{translations.contactUs.email.title}</h3>
        <p>{translations.contactUs.email.address}</p>
      </div>

      <div className="ContactInfo">
        <h3>{translations.contactUs.socialMedia.title}</h3>
        <ul>
          <li>
            <a
              href={translations.contactUs.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href={translations.contactUs.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href={translations.contactUs.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={translations.contactUs.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUsSection;
