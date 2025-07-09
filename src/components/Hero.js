// src/components/Hero.js
import React from 'react';
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import TypingAnimation from './TypingAnimation';

const Hero = () => {
  useDynamicCSS('hero');

  return (
    <AnimatedHeroBackground>
      <TypingAnimation />
    </AnimatedHeroBackground>
  );
};

export default Hero;

