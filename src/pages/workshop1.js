import React, { useState } from 'react';
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';
const AccordionItem = ({ title, content }) => {
  useDynamicCSS(['cards'])
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="accordion" onClick={() => setExpanded(!expanded)}>
      <div className="accordion-header">
        {title}
        <span>{expanded ? '−' : '+'}</span>
      </div>
      <div className={`accordion-content ${expanded ? 'expanded' : ''}`}>
        {content}
      </div>
    </div>
  );
};

export default function ModernShowcasePage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Unleashing Creative Brilliance</h1>
        <p className="page-subtitle">
          This page isn't just about style — it's about presence. Explore a visually powerful, yet lightweight layout that lets your content speak for itself.
        </p>
      </header>

      <div className="youtube-video">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Showcase Video"
          allowFullScreen
        ></iframe>
      </div>

      <section className="section">
        <h2 className="section-title">✨ Key Highlights</h2>
        <ul className="highlights-list">
          <li>Modern animation with CSS keyframes</li>
          <li>Dynamic accordion for modular content</li>
          <li>Professional color scheme and shadows</li>
          <li>Fully responsive layout</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">📂 Explore Modules</h2>
        <AccordionItem
          title="Getting Started"
          content={
            <div className="sub-module">
              <div className="sub-module-title">Introduction</div>
              <p>Learn how to use this UI design effectively for projects and showcases.</p>
            </div>
          }
        />
        <AccordionItem
          title="Features Explained"
          content={
            <div className="sub-module">
              <div className="sub-module-title">Modular Components</div>
              <p>Each section is reusable and easily adjustable. Just plug in your content!</p>
            </div>
          }
        />
        <AccordionItem
          title="Deployment Ready"
          content={
            <div className="sub-module">
              <div className="sub-module-title">Smooth Transitions</div>
              <p>All animations are lightweight and visually engaging — perfect for production.</p>
            </div>
          }
        />
      </section>

      <button className="cta-button">🚀 Launch Your Page</button>
    </div>
  );
}
