// src/pages/About.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer'; // Import the Footer component

// Theme colors and gradients consistent with Course.js
const colors = {
  background: '#0a0a00',
  primaryText: '#ffffff',
  secondaryText: '#a0c4ff',
  highlight: '#ffe600',
  sectionBackground: '#181818',
};

// Fade-in animation for smooth entry of content
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container for the About section
const AboutContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
  color: ${colors.primaryText};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  animation: ${fadeIn} 1.5s ease-out;
  padding: 4rem 2rem;
  box-sizing: border-box;
`;

// Title with consistent styling and animation
const Title = styled.h1`
  font-size: 2.5rem;
  position: relative;
  color: ${colors.primaryText};
  margin-bottom: 3rem;
  text-align: center;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${colors.highlight};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Content wrapper to add responsive layout
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Styled section component with consistent background and animation
const Section = styled.section`
  background: ${colors.sectionBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #242424;
    transform: translateY(-5px);
  }
  animation: ${fadeIn} 1s ease-in-out forwards;
  opacity: 0;
  animation-delay: ${({ delay }) => delay || 0}s;

  h2 {
    color: ${colors.highlight};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.secondaryText};
    line-height: 1.6;
  }
`;

function About({ showFooter = true }) {
  return (
    
      <>
        <AboutContainer>
          <Title>About Crafting Brain</Title>
          <ContentGrid>
            <Section delay={0.2}>
              <h2>Our Mission</h2>
              <p>
                At Crafting Brain, we are dedicated to empowering aspiring data
                scientists with real-world skills through hands-on projects and
                expert mentorship. We focus on nurturing talent and bridging the gap
                between academic knowledge and industry requirements.
              </p>
            </Section>
            <Section delay={0.4}>
              <h2>Why Partner with Inikola?</h2>
              <p>
                Our partnership with Inikola allows us to provide an industry-relevant
                internship experience, offering insights into advanced data science
                practices, cutting-edge technology, and a dynamic learning environment.
              </p>
            </Section>
            <Section delay={0.6}>
              <h2>Industry Expertise</h2>
              <p>
                With years of experience in the data science industry, Crafting Brain
                leverages its network of professionals to provide guidance, mentorship,
                and skill-building opportunities. We focus on practical learning that
                prepares our interns for real-world challenges.
              </p>
            </Section>
            <Section delay={0.8}>
              <h2>Our Core Values</h2>
              <p>
                We believe in transparency, continuous learning, and student-focused
                development. Our goal is to equip every intern with the skills needed
                for a successful career in data science and to inspire a lifelong passion
                for data-driven decision-making.
              </p>
            </Section>
          </ContentGrid>
        </AboutContainer>
        {showFooter && <Footer />} {/* Conditionally render Footer */}
      </>
    
  );
}

export default About;
