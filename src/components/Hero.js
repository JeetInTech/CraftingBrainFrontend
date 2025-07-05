// src/components/Hero.js
import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

function Hero() {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  // const audioRef = useRef(null);

  const rotatingTexts = [
    "Gain Real-World Skills with Exclusive Hands-On Projects in Data Science",
    "Receive a Minimum Stipend of ₹10,000/Month and a 6-Month Internship Certificate from Inikola",
    "Learn from Top Data Science Mentors and Boost Your Career with Crafting Brain & Inikola",
  ];

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: x * 100, y: y * 100 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Handle page load animations and voice
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisitedCraftingBrain");

    // Play welcome voice after animations start
    const voiceTimer = setTimeout(() => {
      playWelcomeVoice(!hasVisited);
      if (!hasVisited) {
        localStorage.setItem("hasVisitedCraftingBrain", "true");
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(voiceTimer);
    };
  }, []);

  // Rotating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  // Text-to-speech function
  const playWelcomeVoice = (isFirstVisit) => {
    if (!("speechSynthesis" in window)) return;

    const message = isFirstVisit
      ? "Welcome to Crafting Brain, Where Automation Meets Intelligence"
      : "Welcome back to Crafting Brain, Where Automation Meets Intelligence";

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.7;

      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Google") ||
          voice.name.includes("Microsoft") ||
          voice.lang.includes("en-US")
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      speechSynthesis.onvoiceschanged = () => {
        speak();
        speechSynthesis.onvoiceschanged = null; // cleanup
      };
    }
  };

  const handleEnrollNow = () => {
    window.location.href = "/payment";
  };

  return (
    <section
      className={`hero-container ${isLoaded ? "loaded" : ""}`}
      ref={heroRef}
      style={{
        "--mouse-x": `${mousePosition.x}%`,
        "--mouse-y": `${mousePosition.y}%`,
        cursor: "default", // Override any custom cursor
      }}
    >
      {/* Animated particles background */}
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--delay": `${Math.random() * 5}s`,
              "--duration": `${5 + Math.random() * 10}s`,
              "--size": `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Animated grid background */}
      <div className="grid-background"></div>

      {/* Video Background */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={require("../assets/video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced overlay with gradient */}
      <div className="overlay"></div>
      <div className="overlay-gradient"></div>

      {/* Floating elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="title-container">
          <h1 className="hero-title">
            <span className="title-line">
              We Don't Just Build <span className="highlight-word">Skills</span>{" "}
              We Craft <span className="highlight-word">Intelligent Minds!</span>
            </span>
            <span className="title-line">
              Become the <span className="highlight-word">mind</span> behind
              tomorrow's <span className="highlight-word">AI</span>
            </span>
          </h1>
          <div className="title-glow"></div>
        </div>

        <div className="rotating-text-container">
          <h2 className="rotating-text" key={index}>
            {rotatingTexts[index]}
          </h2>
        </div>

        <div className="cta-container">
          <button className="cta-button" onClick={handleEnrollNow}>
            <span className="button-text">Begin Journey</span>
            <div className="button-glow"></div>
            <div className="button-ripple"></div>
          </button>
        </div>
      </div>

      {/* Epic entrance animation overlay */}
      <div className="entrance-overlay"></div>
    </section>
  );
  
}

export default Hero;
