import React, { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import "./LanguageSwitcher.css";
import Flag from "react-world-flags";

function LanguageSwitcher() {
  const { switchLanguage, currentLanguage } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (language) => {
    switchLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <div className="language-switcher">
      <div className="flag" onClick={() => handleLanguageChange("en")}>
        <Flag
          code="GB"
          className={`flag-icon language-button ${
            selectedLanguage === "en" ? "selected" : ""
          }`}
        />{" "}
        <p className={`${selectedLanguage === "en" ? "selected" : ""}`}>EN</p>
      </div>
      <div className="flag" onClick={() => handleLanguageChange("sq")}>
        <Flag
          code="AL"
          className={`flag-icon language-button ${
            selectedLanguage === "sq" ? "selected" : ""
          }`}
        />
        <p className={`${selectedLanguage === "sq" ? "selected" : ""}`}>AL</p>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
