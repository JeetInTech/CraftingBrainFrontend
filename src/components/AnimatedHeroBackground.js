import React, { useEffect, useRef } from 'react';
import './AnimatedHeroBackground.css';

const AnimatedHeroBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNeuralNetwork();
    };

    // Initialize neural network
    const initializeNeuralNetwork = () => {
      const nodes = [];
      const connections = [];
      
      // Create scattered neural nodes
      for (let i = 0; i < 25; i++) {
        const node = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2,
          brightness: Math.random() * 0.8 + 0.4,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          floatSpeed: Math.random() * 0.003 + 0.001,
          floatOffset: Math.random() * Math.PI * 2
        };
        nodes.push(node);
      }
      
      // Create connections between nearby nodes
      nodes.forEach((nodeA, indexA) => {
        nodes.forEach((nodeB, indexB) => {
          if (indexA !== indexB) {
            const distance = Math.sqrt(
              Math.pow(nodeA.originalX - nodeB.originalX, 2) + 
              Math.pow(nodeA.originalY - nodeB.originalY, 2)
            );
            
            // Connect nodes that are close enough
            if (distance < 200 && Math.random() > 0.7) {
              connections.push({
                from: nodeA,
                to: nodeB,
                strength: Math.random() * 0.6 + 0.2,
                pulseSpeed: Math.random() * 0.01 + 0.005,
                pulseOffset: Math.random() * Math.PI * 2
              });
            }
          }
        });
      });
      
      nodesRef.current = nodes;
      connectionsRef.current = connections;
    };

    // Neural network animation
    const animateNeuralNetwork = (time) => {
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Draw connections
      connections.forEach(connection => {
        const pulse = Math.sin(time * connection.pulseSpeed + connection.pulseOffset) * 0.5 + 0.5;
        const opacity = connection.strength * pulse * 0.3 + 0.1;
        
        const gradient = ctx.createLinearGradient(
          connection.from.x, connection.from.y,
          connection.to.x, connection.to.y
        );
        
        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 147, 30, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 204, 2, ${opacity * 1.5})`);
          gradient.addColorStop(1, `rgba(255, 167, 38, ${opacity})`);
        } else {
          gradient.addColorStop(0, `rgba(37, 99, 235, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(29, 78, 216, ${opacity * 1.5})`);
          gradient.addColorStop(1, `rgba(30, 64, 175, ${opacity})`);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = pulse * 1.5 + 0.3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        // Floating animation
        const floatY = Math.sin(time * node.floatSpeed + node.floatOffset) * 20;
        const floatX = Math.cos(time * node.floatSpeed * 0.7 + node.floatOffset) * 10;
        
        node.x = node.originalX + floatX;
        node.y = node.originalY + floatY;
        
        // Pulsing animation
        const pulse = Math.sin(time * node.pulseSpeed) * 0.4 + 0.8;
        const currentRadius = node.radius * pulse;
        
        // Node glow
        const glowRadius = currentRadius + 8;
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        
        if (isDark) {
          glowGradient.addColorStop(0, `rgba(255, 204, 2, ${node.brightness * 0.6})`);
          glowGradient.addColorStop(1, 'rgba(255, 147, 30, 0)');
        } else {
          glowGradient.addColorStop(0, `rgba(37, 99, 235, ${node.brightness * 0.6})`);
          glowGradient.addColorStop(1, 'rgba(29, 78, 216, 0)');
        }
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core
        const coreGradient = ctx.createRadialGradient(
          node.x - currentRadius * 0.3, 
          node.y - currentRadius * 0.3, 
          0,
          node.x, node.y, currentRadius
        );
        
        if (isDark) {
          coreGradient.addColorStop(0, `rgba(255, 255, 255, ${node.brightness})`);
          coreGradient.addColorStop(1, `rgba(255, 204, 2, ${node.brightness * 0.8})`);
        } else {
          coreGradient.addColorStop(0, `rgba(255, 255, 255, ${node.brightness})`);
          coreGradient.addColorStop(1, `rgba(37, 99, 235, ${node.brightness * 0.8})`);
        }
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Main animation loop
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animateNeuralNetwork(time);
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="animated-hero-container">
      {/* Neural Network Canvas */}
      <canvas 
        ref={canvasRef}
        className="neural-network-overlay"
      />
      
      {/* Animated Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
        <div className="shape shape-7"></div>
        <div className="shape shape-8"></div>
      </div>
      
      {/* Flowing Ribbons */}
      <div className="flowing-ribbons">
        <div className="ribbon ribbon-1">
          <svg viewBox="0 0 1200 600" className="ribbon-svg">
            <path d="M0,200 C300,50 600,350 1200,200 L1200,600 L0,600 Z" className="ribbon-path"/>
          </svg>
        </div>
        <div className="ribbon ribbon-2">
          <svg viewBox="0 0 1200 600" className="ribbon-svg">
            <path d="M0,300 C400,150 800,450 1200,300 L1200,600 L0,600 Z" className="ribbon-path"/>
          </svg>
        </div>
        <div className="ribbon ribbon-3">
          <svg viewBox="0 0 1200 600" className="ribbon-svg">
            <path d="M0,400 C500,250 700,550 1200,400 L1200,600 L0,600 Z" className="ribbon-path"/>
          </svg>
        </div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
      </div>
      
      {/* Enhanced Particle System */}
      <div className="particles">
        {[...Array(35)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i + 1}`}
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${12 + (i % 6)}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Content Overlay */}
      <div className="hero-content-overlay">
        {children}
      </div>
    </div>
  );
};

export default AnimatedHeroBackground;

