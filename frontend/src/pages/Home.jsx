// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import "../styling/Home.css"; // External CSS

const Home = () => {
  const fullText = "My Shop"; // Text for typing effect
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!deleting) {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) setDeleting(true);
      } else {
        setDisplayedText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setDeleting(false);
      }
    }, 350); // Typing speed

    return () => clearInterval(interval);
  }, [index, deleting]);

  return (
    <div className="home-container">
      <div className="overlay"></div> {/* Dark overlay */}
      
      <div className="home-content">
        <h1 className="home-title">
          {displayedText}
          <span className="cursor"></span>
        </h1>

        <p className="home-subtitle">
          Discover My Shop's products and enjoy shopping with us!
        </p>

        <a href="/products" className="home-button">
          Browse Products
        </a>
      </div>
    </div>
  );
};

export default Home;
