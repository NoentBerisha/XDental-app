import React, { useState } from 'react';
import './FlipComponent.css';

function FlipComponent({ image, name, description, bio, diplomas, specializations, otherInfo }) {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (src) => {
    setEnlargedImage(src);
  };

  const closeModal = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={image} alt={name} className="dentist-image" />
          <h2>{name}</h2>
          
        </div>
        <div className="flip-card-back">
        <div className="section">
          <p>{description}</p>
        </div>  
          {diplomas && (
            <div className="section">
              <h3>Diplomas</h3>
              <div className="diplomas">
                {diplomas?.map((diploma, index) => (
                  <img
                    key={index}
                    src={diploma}
                    alt={`Diploma ${index + 1}`}
                    className="diploma-image"
                    onClick={() => handleImageClick(diploma)}
                  />
                ))}
              </div>
            </div>
          )}
          {specializations && (
            <div className="section">
              <h3>Specializations</h3>
              <ul>
                {specializations?.map((specialization, index) => (
                  <li key={index}>{specialization}</li>
                ))}
              </ul>
            </div>
          )}
          {otherInfo && (
            <div className="section">
              <h3>Other Information</h3>
              <p>{otherInfo}</p>
            </div>
          )}
        </div>
      </div>
      {enlargedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={enlargedImage} alt="Enlarged diploma" />
        </div>
      )}
    </div>
  );
}

export default FlipComponent;