// src/components/Footer.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Updated Colors to match your theme
const colors = {
  background: '#000000',
  primaryText: '#ffffff',
  accent: '#ff6b35',
  secondaryText: '#ffab91',
  warmYellow: '#ffa726',
  brandGold: '#f7931e',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const FooterContainer = styled.footer`
  background: ${colors.background};
  color: ${colors.primaryText};
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;

   box-shadow: 0px -10px 30px rgba(255, 107, 53, 0.2);

  @media (min-width: 768px) {
    padding: 4rem 3rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// Section for company description and logo
const CompanyInfo = styled.div`
  max-width: 300px;
  text-align: left;

  h2 {
    font-size: 1.8rem;
    color: ${colors.warmYellow};
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 167, 38, 0.6);
  }

  p {
    color: ${colors.primaryText};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Styled Navigation Links
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    color: ${colors.warmYellow};
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 167, 38, 0.6);
  }

  a {
    color: ${colors.primaryText};
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${colors.secondaryText};
    }
  }
`;

// Social Media Section
const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    color: ${colors.warmYellow};
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 167, 38, 0.6);
  }

  div {
    display: flex;
    gap: 1rem;

    a {
      color: ${colors.primaryText};
      font-size: 1.5rem;
      transition: color 0.3s;

      &:hover {
        color: ${colors.accent};
      }
    }
  }
`;

// Privacy Policy Button
const PrivacyPolicy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    color: ${colors.warmYellow};
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 167, 38, 0.6);
  }
`;

const PrivacyButton = styled(Link)`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%);
  color: ${colors.primaryText};
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.5);
  }
`;

// Bottom Section
const FooterBottom = styled.div`
  margin-top: 2rem;
  width: 100%;
  border-top: 1px solid #333;
  padding-top: 1rem;
  font-size: 0.85rem;
  color: ${colors.primaryText};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Company Information */}
        <CompanyInfo>
          <h2>Crafting Brain</h2>
          <p>
            Crafting Brain is committed to delivering advanced Data Science and AI training. Through expert mentorship and hands-on projects, we shape tomorrow's leaders in tech.
          </p>
        </CompanyInfo>

        {/* Navigation Links */}
        <NavLinks>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </NavLinks>

        {/* Social Media Links */}
        <SocialMedia>
          <h3>Follow Us</h3>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </SocialMedia>

        {/* Privacy Policy Button */}
        <PrivacyPolicy>
          <h3>Legal</h3>
          <PrivacyButton to="/privacypolicy">
            Privacy Policy
          </PrivacyButton>
        </PrivacyPolicy>
      </FooterContent>

      {/* Footer Bottom */}
      <FooterBottom>
        <p>&copy; 2024 Crafting Brain. All rights reserved.</p>
        <p>
          <Link to="/terms-of-service" style={{ color: '#ffab91', textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;