// src/components/TypingAnimation.js
import React, { useState, useEffect } from 'react';
import './TypingAnimation.css';

const TypingAnimation = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Words to cycle through
  const words = [
    'Skills',
    'Careers', 
    'Futures',
    'Innovations',
    'Solutions',
    'Minds'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        // Deleting characters
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        setTypingSpeed(75); // Faster deletion
      } else {
        // Typing characters
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        setTypingSpeed(150); // Normal typing speed
      }

      // When word is complete
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
      }
      
      // When deletion is complete
      if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <div className="typing-animation-container">
      <div className="hero-main-title">
        We Don't Just Build{' '}
        <span className="typing-text">
          {currentText}
          <span className="cursor">|</span>
        </span>
      </div>
      
      <div className="hero-main-title">
        We Craft
      </div>
      
      <div className="hero-main-title highlight-text">
        Intelligent Minds!
      </div>
      
      <div className="hero-secondary-title">
        Become the <span className="typing-text-secondary">Mind</span> behind tomorrow's{' '}
        <span className="highlight-text">AI</span>
      </div>
      
      <p className="hero-description">
        Gain Real-World Skills with Exclusive Hands-On Projects in Data Science
      </p>
      
      <button className="cta-button-animated">
        <span className="button-text">BEGIN JOURNEY</span>
        <div className="button-hover-effect"></div>
      </button>
    </div>
  );
};

export default TypingAnimation;