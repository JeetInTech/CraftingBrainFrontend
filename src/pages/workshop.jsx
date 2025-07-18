import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Star,
  X,
  ChevronRight,
  Play,
  // Award,
  BookOpen,
  Video,
  Settings,
  // Plus,
  Edit,
  Trash2,
  // Eye,
} from "lucide-react";
import { useDynamicCSS } from "../hooks/DynamicCSSLoader";
import "./workshop-styles.css";

const WorkshopPage = () => {
  useDynamicCSS("workshop");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [animatedWorkshops, setAnimatedWorkshops] = useState([]);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "beginner",
  });
  const [adminForm, setAdminForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    instructor: "",
    instructorTitle: "",
    instructorImage: "",
    isLive: false,
    videoUrl: "",
    liveVideoUrl: "",
  });

  // Mock current workshop data
  const [featuredWorkshop, setFeaturedWorkshop] = useState({
    id: 1,
    title: "ADVANCED AGENTIC AI Techniques",
    subtitle: "WORKSHOP",
    date: "Sunday 28 July 2024",
    time: "2 - 6 PM",
    instructor: "Jeet",
    instructorTitle: "Senior ai Developer",
    instructorImage:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg",
    description:
      "Join our comprehensive Ai workshop and master modern web development techniques",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    liveVideoUrl: "https://www.youtube.com/embed/live_stream_id",
    isLive: false,
  });

  // Mock previous workshops data
  const previousWorkshops = [
    {
      id: 1,
      title: "Advanced Ai Patterns",
      date: "June 15, 2024",
      participants: 150,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      instructor: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Modern Dl Techniques",
      date: "May 20, 2024",
      participants: 120,
      rating: 4.9,
      image:
        "",
      instructor: "Mike Chen",
    },
    {
      id: 3,
      title: "Machine learning  Fundamentals",
      date: "April 10, 2024",
      participants: 200,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop",
      instructor: "Alex Rodriguez",
    },
  ];

  // Check if workshop is live (mock implementation)
  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const workshopDate = new Date(featuredWorkshop.date);
      const timeDiff = Math.abs(now - workshopDate);
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Mock: Consider live if within 2 hours of workshop time
      setIsLive(hoursDiff < 2 && featuredWorkshop.isLive);
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [featuredWorkshop]);

  // Scroll animation for previous workshops
  useEffect(() => {
    const handleScroll = () => {
      const workshopSection = document.getElementById("previous-workshops");
      if (workshopSection) {
        const rect = workshopSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && animatedWorkshops.length === 0) {
          previousWorkshops.forEach((workshop, index) => {
            setTimeout(() => {
              setAnimatedWorkshops((prev) => [...prev, workshop.id]);
            }, index * 200);
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animatedWorkshops]);

  // Handle registration form submission
  const handleRegistrationSubmit = () => {
    console.log("Registration submitted:", formData);
    setIsRegistrationOpen(false);
    setFormData({ name: "", email: "", phone: "", experience: "beginner" });
  };

  // Handle admin form submission
  const handleAdminSubmit = () => {
    if (adminForm.title && adminForm.date && adminForm.instructor) {
      const newWorkshop = {
        ...adminForm,
        id: Date.now(),
        participants: 0,
        rating: 0,
      };

      if (currentWorkshop) {
        // Update existing workshop
        setFeaturedWorkshop((prev) => ({ ...prev, ...adminForm }));
      } else {
        // Add new workshop
        setWorkshops((prev) => [...prev, newWorkshop]);
      }

      setIsAdminPanelOpen(false);
      setCurrentWorkshop(null);
      setAdminForm({
        title: "",
        date: "",
        time: "",
        description: "",
        instructor: "",
        instructorTitle: "",
        instructorImage: "",
        isLive: false,
        videoUrl: "",
        liveVideoUrl: "",
      });
    }
  };

  // Edit workshop
  const editWorkshop = (workshop) => {
    setCurrentWorkshop(workshop);
    setAdminForm(workshop);
    setIsAdminPanelOpen(true);
  };

  // Delete workshop
  const deleteWorkshop = (id) => {
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="workshop-page">
        {/* Admin Toggle Button */}
        <button
          className="admin-toggle-btn"
          onClick={() => setIsAdminPanelOpen(true)}
        >
          <Settings />
        </button>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="workshop-badge">
                  <span>Online</span>
                  <span className="badge-type">AGENTIC AI</span>
                </div>
                <h1>
                  <span className="hero-title-main">
                    {featuredWorkshop.title}
                  </span>
                  <span className="hero-title-sub">
                    {featuredWorkshop.subtitle}
                  </span>
                </h1>
                <div className="workshop-info">
                  <div className="info-item">
                    <Calendar className="icon" />
                    <span>{featuredWorkshop.date}</span>
                  </div>
                  <div className="info-item">
                    <Clock className="icon" />
                    <span>Live Start at {featuredWorkshop.time}</span>
                  </div>
                  <div className="info-item">
                    <Users className="icon" />
                    <span>Limited Seats Available</span>
                  </div>
                  {isLive && (
                    <div className="info-item live-indicator">
                      <div className="live-dot"></div>
                      <span>LIVE NOW</span>
                    </div>
                  )}
                </div>

                <div className="action-buttons">
                  <button
                    className="register-btn"
                    onClick={() => setIsRegistrationOpen(true)}
                  >
                    Register Now
                    <ChevronRight className="btn-icon" />
                  </button>

                  <button
                    className="watch-btn"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <Video className="btn-icon" />
                    {isLive ? "Watch Live" : "Watch Preview"}
                  </button>
                </div>

                <div className="workshop-details">
                  <p>{featuredWorkshop.description}</p>
                  <div className="social-links">
                    <span>Follow Us:</span>
                    <div className="social-icons">
                      <a href="/" className="social-icon">
                        📘
                      </a>
                      <a href="/" className="social-icon">
                        📷
                      </a>
                      <a href="/" className="social-icon">
                        🐦
                      </a>
                      <a href="/" className="social-icon">
                        💼
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Speaker Card Style - Full Right Section */}
              <div className="hero-image">
                <div className="instructor-photo-container">
                  <img
                    src={featuredWorkshop.instructorImage}
                    alt={featuredWorkshop.instructor}
                    className="instructor-photo"
                  />
                </div>
                <div className="instructor-details">
                  <h3>{featuredWorkshop.instructor}</h3>
                  <p>{featuredWorkshop.instructorTitle}</p>
                </div>

                {/* Background Animation Elements */}
                <div className="bg-animations">
                  <div className="animated-circle circle-1"></div>
                  <div className="animated-circle circle-2"></div>
                  <div className="animated-circle circle-3"></div>
                  <div className="animated-line line-1"></div>
                  <div className="animated-line line-2"></div>
                  <div className="animated-line line-3"></div>
                  <div className="floating-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Highlights */}
        <section className="highlights">
          <div className="container">
            <h2>What You'll Learn</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <BookOpen className="highlight-icon" />
                <h3>Modern Ai Patterns</h3>
                <p>
                  Learn advanced patterns including hooks, context, and state
                  management
                </p>
              </div>
              <div className="highlight-card">
                <Play className="highlight-icon" />
                <h3>Hands-on Projects</h3>
                <p>Build real-world applications with guided coding sessions</p>
              </div>
              <div className="highlight-card">
                <Users className="highlight-icon" />
                <h3>Expert Guidance</h3>
                <p>
                  Get mentorship from industry professionals and networking
                  opportunities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Previous Workshops */}
        <section id="previous-workshops" className="previous-workshops">
          <div className="container">
            <h2>Previous Workshops</h2>
            <div className="workshops-grid">
              {previousWorkshops.map((workshop, index) => (
                <div
                  key={workshop.id}
                  className={`workshop-card ${
                    animatedWorkshops.includes(workshop.id) ? "animate-in" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="workshop-image">
                    <img src={workshop.image} alt={workshop.title} />
                    <div className="workshop-overlay">
                      <Play className="play-icon" />
                    </div>
                  </div>
                  <div className="workshop-content">
                    <h3>{workshop.title}</h3>
                    <p className="workshop-date">{workshop.date}</p>
                    <div className="workshop-stats">
                      <div className="stat">
                        <Users className="stat-icon" />
                        <span>{workshop.participants} participants</span>
                      </div>
                      <div className="stat">
                        <Star className="stat-icon" />
                        <span>{workshop.rating}/5</span>
                      </div>
                    </div>
                    <p className="instructor">by {workshop.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Popup */}
        {isVideoOpen && (
          <div className="modal-overlay" onClick={() => setIsVideoOpen(false)}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{isLive ? "Live Workshop" : "Workshop Preview"}</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsVideoOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="video-container">
                <iframe
                  src={
                    isLive
                      ? featuredWorkshop.liveVideoUrl
                      : featuredWorkshop.videoUrl
                  }
                  frameBorder="0"
                  allowFullScreen
                  title="Workshop Video"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Registration Popup */}
        {isRegistrationOpen && (
          <div
            className="modal-overlay"
            onClick={() => setIsRegistrationOpen(false)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Register for Workshop</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsRegistrationOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="registration-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Experience Level</label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button
                  onClick={handleRegistrationSubmit}
                  className="submit-btn"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {isAdminPanelOpen && (
          <div
            className="modal-overlay"
            onClick={() => setIsAdminPanelOpen(false)}
          >
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Workshop Admin Panel</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsAdminPanelOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="admin-content">
                <div className="admin-section">
                  <h3>Create/Edit Workshop</h3>
                  <div className="admin-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Workshop Title</label>
                        <input
                          type="text"
                          value={adminForm.title}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          value={adminForm.date}
                          onChange={(e) =>
                            setAdminForm({ ...adminForm, date: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Time</label>
                        <input
                          type="text"
                          value={adminForm.time}
                          onChange={(e) =>
                            setAdminForm({ ...adminForm, time: e.target.value })
                          }
                          placeholder="e.g., 2 - 6 PM"
                        />
                      </div>
                      <div className="form-group">
                        <label>Instructor</label>
                        <input
                          type="text"
                          value={adminForm.instructor}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              instructor: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Instructor Title</label>
                      <input
                        type="text"
                        value={adminForm.instructorTitle}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            instructorTitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Instructor Image URL</label>
                      <input
                        type="url"
                        value={adminForm.instructorImage}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            instructorImage: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={adminForm.description}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Video URL</label>
                        <input
                          type="url"
                          value={adminForm.videoUrl}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              videoUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Video URL</label>
                        <input
                          type="url"
                          value={adminForm.liveVideoUrl}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              liveVideoUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={adminForm.isLive}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              isLive: e.target.checked,
                            })
                          }
                        />
                        Workshop is Live
                      </label>
                    </div>

                    <button onClick={handleAdminSubmit} className="submit-btn">
                      {currentWorkshop ? "Update Workshop" : "Create Workshop"}
                    </button>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>Manage Workshops</h3>
                  <div className="workshop-list">
                    <div className="workshop-item">
                      <div className="workshop-info">
                        <h4>Featured: {featuredWorkshop.title}</h4>
                        <p>{featuredWorkshop.date}</p>
                      </div>
                      <div className="workshop-actions">
                        <button onClick={() => editWorkshop(featuredWorkshop)}>
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>

                    {workshops.map((workshop) => (
                      <div key={workshop.id} className="workshop-item">
                        <div className="workshop-info">
                          <h4>{workshop.title}</h4>
                          <p>{workshop.date}</p>
                        </div>
                        <div className="workshop-actions">
                          <button onClick={() => editWorkshop(workshop)}>
                            <Edit size={16} />
                          </button>
                          <button onClick={() => deleteWorkshop(workshop.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>Contact Us</h4>
                <p>Email: workshops@crafingbrain.com</p>
                <p>Phone: 90########</p>
              </div>
              <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="/">Facebook</a>
                  <a href="/">Twitter</a>
                  <a href="/">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Crafting Brain. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WorkshopPage;
