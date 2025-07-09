// src/hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';
import '../styles/ScrollAnimations.css';

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    animationClass = 'animate-in'
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return {
    elementRef,
    isVisible,
    animationClass: isVisible ? animationClass : ''
  };
};

// Hook for staggered animations
const useStaggeredAnimation = (itemCount, options = {}) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    staggerDelay = 100,
    animationClass = 'animate-in'
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          // Trigger staggered animation
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * staggerDelay);
          }
          setHasAnimated(true);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setVisibleItems(new Set());
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [itemCount, threshold, rootMargin, triggerOnce, staggerDelay, hasAnimated]);

  const getItemAnimationClass = (index) => {
    return visibleItems.has(index) ? animationClass : '';
  };

  return {
    containerRef,
    getItemAnimationClass,
    allItemsVisible: visibleItems.size === itemCount
  };
};

// Hook for multiple elements with different animations
const useMultipleScrollAnimations = (animationConfigs) => {
  const refs = useRef([]);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(new Set());

  useEffect(() => {
    const observers = [];

    animationConfigs.forEach((config, index) => {
      const element = refs.current[index];
      if (!element) return;

      const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true,
        delay = 0
      } = config;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          if (entry.isIntersecting && (!triggerOnce || !hasAnimated.has(index))) {
            if (delay > 0) {
              setTimeout(() => {
                setVisibleElements(prev => new Set([...prev, index]));
                setHasAnimated(prev => new Set([...prev, index]));
              }, delay);
            } else {
              setVisibleElements(prev => new Set([...prev, index]));
              setHasAnimated(prev => new Set([...prev, index]));
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [animationConfigs, hasAnimated]);

  const getRef = (index) => {
    return (el) => {
      refs.current[index] = el;
    };
  };

  const getAnimationClass = (index) => {
    return visibleElements.has(index) ? 'animate-in' : '';
  };

  return {
    getRef,
    getAnimationClass,
    isVisible: (index) => visibleElements.has(index)
  };
};

export { useScrollAnimation, useStaggeredAnimation, useMultipleScrollAnimations };