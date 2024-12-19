import React, { useState } from 'react';
import './style.css';

const Sections = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className = "page" >
      <h1 className = "page-title"> Reem's Problem-Solving Skills and Competitive Programming </h1>
      <div className = "section">
        <div className = "section-header" onClick={toggleSection}>
          <h3 className= "section-title"> Section 1 </h3>
          <button>{isOpen ? "-" : "+"}</button>
        </div>
        {isOpen && (
          <div className = "section-content">
            <p>
            Reem is very good at solving problems. She can look at difficult problems and break them into smaller, easier steps. 
            This helps her find simple and smart solutions.
            Reem loves learning new things, which makes her great at competitive programming. 
            She joins many coding contests and does well in solving puzzles about algorithms and data structures.
            She uses programming languages like C++ and Python to create clever and fast solutions. 
            People often notice her for her quick thinking and accurate answers. 
            Reem's skills and hard work inspire others who want to become better coders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sections;
