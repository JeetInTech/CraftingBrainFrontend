import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Target, Eye, Users, BookOpen, Award, Star, Linkedin, ArrowRight, PlayCircle, CheckCircle, TrendingUp, Code, Brain } from 'lucide-react';

const AboutCraftingBrain = ({ showFooter = true }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [animatedCounters, setAnimatedCounters] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Refs for scroll animations
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const countersRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Sample data
  const teamMembers = [
    { id: 1, name: 'Dr. Sarah Chen', role: 'AI Research Director', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b798?w=150&h=150&fit=crop&crop=face', linkedin: '#' },
    { id: 2, name: 'Marcus Rodriguez', role: 'Data Science Lead', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', linkedin: '#' },
    { id: 3, name: 'Emily Wang', role: 'ML Engineering Manager', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', linkedin: '#' },
    { id: 4, name: 'James Thompson', role: 'Industry Partnerships', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', linkedin: '#' }
  ];

  const testimonials = [
    { 
      id: 1, 
      name: 'Alex Kim', 
      role: 'ML Engineer at Google', 
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      quote: 'Crafting Brain transformed my career completely. The hands-on projects prepared me for real-world challenges.',
      story: 'Started as a junior developer, now leading ML initiatives at Google. The mentorship here was invaluable for my growth.'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      role: 'Data Scientist at Netflix', 
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b798?w=80&h=80&fit=crop&crop=face',
      quote: 'The curriculum is cutting-edge and the community support is amazing. Best investment I ever made.',
      story: 'Transitioned from finance to data science. Now building recommendation systems that impact millions of users daily.'
    },
    { 
      id: 3, 
      name: 'Michael Zhang', 
      role: 'AI Researcher at OpenAI', 
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      quote: 'The research-driven approach here is unmatched. I gained skills that directly apply to breakthrough AI research.',
      story: 'Published 3 papers during the program. The research mentorship helped me land my dream role in AI research.'
    }
  ];

  const timelineEvents = [
    { year: 2018, title: 'Founded', description: 'Crafting Brain was established with a vision to democratize AI education.' },
    { year: 2020, title: 'First Cohort', description: 'Launched our inaugural program with 25 ambitious students.' },
    { year: 2022, title: 'Data Science Bootcamp', description: 'Expanded curriculum to include comprehensive data science training.' },
    { year: 2023, title: 'Industry Partnerships', description: 'Formed partnerships with Fortune 500 companies for direct job placements.' },
    { year: 2024, title: 'Global Expansion', description: 'Launched online programs reaching students across 50+ countries.' }
  ];

  const stats = [
    { label: 'Graduate Placement Rate', value: 94, suffix: '%' },
    { label: 'Average Salary Increase', value: 85, suffix: '%' },
    { label: 'Project Completion Rate', value: 98, suffix: '%' },
    { label: 'Student Satisfaction', value: 4.9, suffix: '/5' }
  ];

  // Intersection Observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [heroRef, missionRef, timelineRef, valuesRef, teamRef, countersRef, testimonialsRef];
    elements.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (visibleElements.has('counters') && !animatedCounters) {
      setAnimatedCounters(true);
    }
  }, [visibleElements, animatedCounters]);

  // Team carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamMember(prev => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTestimonialFlip = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const CounterAnimation = ({ target, suffix, label }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (animatedCounters) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }
    }, [animatedCounters, target]);
    
    return (
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {suffix === '/5' ? count.toFixed(1) : count}{suffix}
        </div>
        <div className="text-gray-600 dark:text-gray-400">{label}</div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        :root {
          --primary-blue: #2e6ef7;
          --secondary-gray: #5a5a5a;
          --accent-color: #ff6b6b;
          --success-green: #10b981;
          --warning-orange: #f59e0b;
        }
        
        .dark {
          --primary-blue: #4d8ff7;
          --secondary-gray: #a1a1a1;
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #2e6ef7, #4d8ff7, #6ba3f7, #8bb7f7, #2e6ef7);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          overflow: hidden;
        }
        
        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        @keyframes slideInLeft {
          from { 
            transform: translateX(-100px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(100px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        .flip-card {
          perspective: 1000px;
          height: 220px;
          cursor: pointer;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .flip-card:hover .flip-card-front,
        .flip-card:hover .flip-card-back {
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform: translateY(0);
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(46, 110, 247, 0.1);
          border-color: var(--primary-blue);
        }
        
        .dark .card-hover:hover {
          box-shadow: 0 20px 40px rgba(77, 143, 247, 0.2);
        }
        
        .pulse-button {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(46, 110, 247, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(46, 110, 247, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(46, 110, 247, 0);
          }
        }
        
        .timeline-line {
          background: linear-gradient(to bottom, transparent, #2e6ef7, transparent);
        }
        
        .timeline-node {
          position: relative;
        }
        
        .timeline-node::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #2e6ef7;
          border-radius: 50%;
          box-shadow: 0 0 0 4px white, 0 0 0 8px #2e6ef7;
          animation: pulse-timeline 2s infinite;
        }
        
        .dark .timeline-node::before {
          box-shadow: 0 0 0 4px #111827, 0 0 0 8px #4d8ff7;
        }
        
        @keyframes pulse-timeline {
          0% {
            box-shadow: 0 0 0 4px white, 0 0 0 8px #2e6ef7;
          }
          50% {
            box-shadow: 0 0 0 4px white, 0 0 0 12px rgba(46, 110, 247, 0.5);
          }
          100% {
            box-shadow: 0 0 0 4px white, 0 0 0 8px #2e6ef7;
          }
        }
        
        .team-card {
          transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        .team-photo {
          transition: all 0.3s ease;
          border: 4px solid transparent;
        }
        
        .team-card:hover .team-photo {
          border-color: #2e6ef7;
          transform: scale(1.05);
        }
        
        .stat-card {
          background: linear-gradient(135deg, rgba(46, 110, 247, 0.1), rgba(77, 143, 247, 0.05));
          border: 1px solid rgba(46, 110, 247, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .dark .stat-card {
          background: linear-gradient(135deg, rgba(77, 143, 247, 0.15), rgba(107, 163, 247, 0.1));
          border: 1px solid rgba(77, 143, 247, 0.3);
        }
        
        @media (max-width: 768px) {
          .flip-card {
            height: 200px;
          }
          
          .timeline-node::before {
            left: 20px;
          }
        }
        
        .scroll-indicator {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        
        .theme-toggle {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .theme-toggle {
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }
      `}</style>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="theme-toggle fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="text-2xl">{isDarkMode ? '☀️' : '🌙'}</span>
      </button>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center gradient-bg text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight ${visibleElements.has('hero') ? 'fade-in-up' : 'opacity-0'}`}>
            About Crafting Brain
          </h1>
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto leading-relaxed ${visibleElements.has('hero') ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
            Empowering the next generation of AI and Data Science professionals through hands-on learning, expert mentorship, and real-world projects that shape the future
          </p>
          <button
            onClick={() => scrollToSection('workshops')}
            className={`pulse-button inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg ${visibleElements.has('hero') ? 'fade-in-up stagger-3' : 'opacity-0'}`}
          >
            Join a Workshop
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        <div className="scroll-indicator absolute bottom-8 left-1/2">
          <ChevronDown className="h-8 w-8 text-white opacity-80" />
        </div>
      </section>

      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Mission & Vision */}
        <section ref={missionRef} id="mission" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Foundation</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Built on the principles of innovation, excellence, and transformative education
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`card-hover bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 ${visibleElements.has('mission') ? 'slide-in-left' : 'opacity-0'}`}>
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-full mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  To democratize AI and Data Science education through innovative teaching methods, personalized mentorship, and industry-relevant projects. We believe in learning by doing, connecting theory with practice to prepare students for the rapidly evolving tech landscape.
                </p>
              </div>
              
              <div className={`card-hover bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 ${visibleElements.has('mission') ? 'slide-in-right' : 'opacity-0'}`}>
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-full mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  To become the global leader in practical AI education, fostering a community of lifelong learners who drive innovation and solve real-world problems. We envision a future where our graduates are at the forefront of technological advancement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Timeline */}
        <section ref={timelineRef} id="timeline" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From humble beginnings to global impact - discover the milestones that shaped our story
              </p>
            </div>
            <div className="relative">
              <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 h-full w-1"></div>
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} ${visibleElements.has('timeline') ? `fade-in-up stagger-${index + 1}` : 'opacity-0'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{event.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  <div className="timeline-node absolute left-1/2 transform -translate-x-1/2 w-4 h-4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section ref={valuesRef} id="values" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Core Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The principles that guide every aspect of our educational philosophy
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Code, title: 'Hands-On Learning', description: 'Learning through practical projects and real-world applications that build tangible skills' },
                { icon: Users, title: 'Expert Mentorship', description: 'Guidance from industry professionals and researchers who shape the future of AI' },
                { icon: BookOpen, title: 'Community', description: 'Building lasting connections and collaborative networks that extend beyond graduation' },
                { icon: Brain, title: 'Research-Driven', description: 'Curriculum based on latest research and industry trends, keeping pace with innovation' }
              ].map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`text-center group ${visibleElements.has('values') ? `fade-in-up stagger-${index + 1}` : 'opacity-0'}`}
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Spotlight */}
        <section ref={teamRef} id="team" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                World-class educators and industry leaders dedicated to your success
              </p>
            </div>
            <div className="relative">
              <div className={`team-card transition-all duration-500 ${visibleElements.has('team') ? 'fade-in-up' : 'opacity-0'}`}>
                <img
                  src={teamMembers[currentTeamMember].photo}
                  alt={teamMembers[currentTeamMember].name}
                  className="team-photo w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-xl"
                />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {teamMembers[currentTeamMember].name}
                </h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 mb-6">{teamMembers[currentTeamMember].role}</p>
                <a
                  href={teamMembers[currentTeamMember].linkedin}
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-medium"
                >
                  <Linkedin className="h-6 w-6 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>
              <div className="flex justify-center mt-8 space-x-3">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamMember(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTeamMember 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`View team member ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Outcomes */}
        <section ref={countersRef} id="counters" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Impact</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Real results that speak to the quality and effectiveness of our programs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`stat-card p-8 rounded-xl text-center ${visibleElements.has('counters') ? `fade-in-up stagger-${index + 1}` : 'opacity-0'}`}
                >
                  <CounterAnimation
                    target={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} id="testimonials" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Success Stories</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Hear from our graduates who are now leading innovation at top tech companies worldwide
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`flip-card ${flippedCards.has(testimonial.id) ? 'flipped' : ''} ${visibleElements.has('testimonials') ? `fade-in-up stagger-${index + 1}` : 'opacity-0'}`}
                  onClick={() => toggleTestimonialFlip(testimonial.id)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front bg-white dark:bg-gray-700 shadow-lg">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 dark:border-blue-900"
                      />
                      <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                      <div>
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flip-card-back bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
                      <Star className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                      <p className="leading-relaxed mb-4">{testimonial.story}</p>
                      <div className="text-sm opacity-80">Click to flip back</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="workshops" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to craft your future?</h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Join thousands of students who have transformed their careers with our world-class programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="pulse-button inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Download Curriculum
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutCraftingBrain;