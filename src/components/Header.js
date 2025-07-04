// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

function Header() {
  const { pathname } = useLocation();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);



  // Scroll handler for auto-hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHeaderHidden(true);
      } else {
        // Scrolling up
        setIsHeaderHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (targetPath) => {
    if (pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isHeaderHidden ? 'hidden' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => handleLinkClick("/")}>
        
          <video className="video-logo" autoPlay loop muted playsInline>
        <source src={require("../assets/CB.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link 
            to="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </Link>
          <Link 
            to="/courses" 
            className={`nav-link ${pathname === '/courses' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/courses")}
          >
            Courses
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/about")}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/contact")}
          >
            Contact
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Search Bar */}
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <button 
                type="button" 
                className="search-toggle"
                onClick={toggleSearch}
                aria-label="Toggle search"
              >
                {isSearchOpen ? <FiX /> : <FiSearch />}
              </button>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus={isSearchOpen}
              />
            </form>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <Link 
            to="/" 
            className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </Link>
          <Link 
            to="/courses" 
            className={`mobile-nav-link ${pathname === '/courses' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/courses")}
          >
            Courses
          </Link>
          <Link 
            to="/about" 
            className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/about")}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={() => handleLinkClick("/contact")}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;