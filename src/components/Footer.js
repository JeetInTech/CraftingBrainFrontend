// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';

function Footer() {
  useDynamicCSS('footer');
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Information */}
        <div className="footer-company-info">
          <h2>Crafting Brain</h2>
          <p>
            Crafting Brain is committed to delivering advanced Data Science and AI training. Through expert mentorship and hands-on projects, we shape tomorrow's leaders in tech.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/workshop">Workshop</Link>
          {/* <Link to="/recordings">Recordings</Link> */}
        </div>

        {/* Social Media Links */}
        <div className="footer-social-media">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Privacy Policy Button */}
        <div className="footer-privacy-policy">
          <h3>Legal</h3>
          <Link to="/privacypolicy" className="footer-privacy-button">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 Crafting Brain. All rights reserved.</p>
        <p>
          <Link to="/terms-of-service">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;