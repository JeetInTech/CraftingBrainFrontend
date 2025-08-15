import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  Users,
  Star,
  X,
  ChevronRight,
  Play,
  BookOpen,
  Video,
  Settings,
  Edit,
  Trash2,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useDynamicCSS } from "../hooks/DynamicCSSLoader";
import "./workshop-styles.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

const WorkshopPage = () => {
  useDynamicCSS("workshop");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [animatedWorkshops, setAnimatedWorkshops] = useState([]);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [ongoingWorkshops, setOngoingWorkshops] = useState([]);
  const [previousWorkshops, setPreviousWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "beginner",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
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
  const [featuredWorkshop, setFeaturedWorkshop] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  // Fetch workshops from AWS API
  function onClose() {
  setIsOpen(false); // or setShowModal(false)
}
  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, removing: true } : toast
    ));
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };
  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://8zrj1t4nx2.execute-api.us-east-1.amazonaws.com/wk/getWk",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Normalize API response and add IDs
      const workshopsData = (data.workshops || data || []).map(
        (workshop, index) => ({
          ...workshop,
          id: workshop.id || `workshop-${index}-${workshop.Name || "unknown"}-${workshop.Date || "unknown"}`,
          title: workshop.Name || "Untitled Workshop",
          date: workshop.Date || new Date().toISOString().split("T")[0],
          instructor: workshop.author || "Unknown Instructor",
          time: workshop.time || "TBD",
          image:
            workshop.image ||
            "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop",
          participants: workshop.participants || 0,
          rating: workshop.rating || 0,
          instructorTitle: workshop.instructorTitle || "Instructor",
          instructorImage:
            workshop.instructorImage ||
            "https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg",
          isLive: workshop.isLive || false,
          liveVideoUrl: workshop.liveVideoUrl || workshop.registerLink || "",
          description: workshop.description || "No description available",
          place: workshop.place || "Online",
        })
      );

      setWorkshops(workshopsData);
      categorizeWorkshops(workshopsData);
    } catch (err) {
      console.error("Error fetching workshops:", err);
      setError("Failed to load workshops. Please try again later.");
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // Categorize workshops into ongoing and previous
  const categorizeWorkshops = (workshopsData) => {
    const now = new Date();
    const ongoing = [];
    const previous = [];

    workshopsData.forEach((workshop) => {
      const workshopDate = new Date(workshop.date);
      if (
        workshopDate >=
        new Date(now.getFullYear(), now.getMonth(), now.getDate())
      ) {
        ongoing.push(workshop);
      } else {
        previous.push(workshop);
      }
    });

    ongoing.sort((a, b) => new Date(a.date) - new Date(b.date));
    previous.sort((a, b) => new Date(b.date) - new Date(a.date));

    setOngoingWorkshops(ongoing);
    setPreviousWorkshops(previous);

    if (ongoing.length > 0) {
      setFeaturedWorkshop(ongoing[0]);
    } else if (previous.length > 0) {
      setFeaturedWorkshop(previous[0]);
    } else {
      setFeaturedWorkshop(null);
    }
  };

  // Mock data fallback
  const loadMockData = () => {
    const mockWorkshops = [
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        Date: "2024-08-15",
        place: "Online",
        time: "2 - 6 PM",
        registerLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description:
          "Join our comprehensive React workshop and master modern web development techniques",
        author: "Sarah Johnson",
        Name: "Advanced React Patterns",
      },
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        Date: "2024-06-20",
        place: "Online",
        time: "10 AM - 2 PM",
        registerLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Learn cutting-edge CSS techniques and modern styling approaches",
        author: "Mike Chen",
        Name: "Modern CSS Techniques",
      },
    ];

    const normalizedMockWorkshops = mockWorkshops.map((workshop, index) => ({
      ...workshop,
      id: `mock-${index}-${workshop.Name}-${workshop.Date}`,
      title: workshop.Name,
      date: workshop.Date,
      instructor: workshop.author,
      time: workshop.time,
      image:
        workshop.image ||
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop",
      participants: workshop.participants || 0,
      rating: workshop.rating || 0,
      instructorTitle: workshop.instructorTitle || "Instructor",
      instructorImage:
        workshop.instructorImage ||
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg",
      isLive: workshop.isLive || false,
      liveVideoUrl: workshop.liveVideoUrl || workshop.registerLink,
      description: workshop.description,
      place: workshop.place,
    }));

    setWorkshops(normalizedMockWorkshops);
    categorizeWorkshops(normalizedMockWorkshops);
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  // Check if workshop is live
  useEffect(() => {
    if (!featuredWorkshop) return;

    const checkLiveStatus = () => {
      const now = new Date();
      const workshopDate = new Date(featuredWorkshop.date);
      const timeDiff = Math.abs(now - workshopDate);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      setIsLive(hoursDiff < 2 && featuredWorkshop.isLive);
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000);
    return () => clearInterval(interval);
  }, [featuredWorkshop]);

  // Scroll animation for workshops
  useEffect(() => {
    const handleScroll = () => {
      const workshopSections = document.querySelectorAll(".workshops-section");

      workshopSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const cards = section.querySelectorAll(".workshop-card");
          cards.forEach((card, index) => {
            if (!animatedWorkshops.includes(card.dataset.id)) {
              setTimeout(() => {
                setAnimatedWorkshops((prev) => [...prev, card.dataset.id]);
              }, index * 200);
            }
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animatedWorkshops]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Workshop card component
  const WorkshopCard = ({ workshop, index, isOngoing = false }) => {
    const workshopId = String(workshop.id || `workshop-${index}`);
    return (
      <div
        key={workshopId}
        className={`workshop-card ${
          animatedWorkshops.includes(workshopId) ? "animate-in" : ""
        } ${isOngoing ? "ongoing-card" : ""}`}
        style={{ animationDelay: `${index * 0.1}s` }}
        data-id={workshopId}
      >
        <div className="workshop-image">
          <img
            src={
              workshop.image ||
              "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop"
            }
            alt={workshop.title || "Workshop"}
          />
          <div className="workshop-overlay">
            <Play className="play-icon" />
            {isOngoing && <div className="ongoing-badge">Upcoming</div>}
          </div>
        </div>
        <div className="workshop-content">
          <h3>{workshop.title || "Untitled Workshop"}</h3>
          <p className="workshop-date">{formatDate(workshop.date)}</p>
          {workshop.time && (
            <p className="workshop-time">
              <Clock className="time-icon" />
              {workshop.time}
            </p>
          )}
          <div className="workshop-stats">
            <div className="stat">
              <Users className="stat-icon" />
              <span>{workshop.participants || 0} participants</span>
            </div>
            {workshop.rating > 0 && (
              <div className="stat">
                <Star className="stat-icon" />
                <span>{workshop.rating}/5</span>
              </div>
            )}
          </div>
          <p className="instructor">by {workshop.instructor || "Unknown Instructor"}</p>
          {isOngoing && (
            <button
              className="register-small-btn"
              onClick={() => setIsRegistrationOpen(true)}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    );
  };
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const payload = {
        ...formData,
        workshop: featuredWorkshop?.title || "",
      };
      
      await axios.post(
        "https://h5kp0hj673.execute-api.us-east-1.amazonaws.com/wkr/wkr", 
        payload,
        {
          timeout: 10000, // 10 second timeout
        }
      );
      
      // Success - show custom toast and navigate
      showToast("🎉 Successfully Registered!", 'success', 3000);
      

      setTimeout(() => {
        onClose();

      }, 1500);
      
    } catch (error) {
      console.error("Submission error:", error);
      setError("Submission failed. Please check your connection and try again.");
      showToast("❌ Submission failed. Please try again.", 'error', 5000);
    } finally {
      setIsLoading(false);
    }
  };


  // Handle admin form submission
  const handleAdminSubmit = () => {
    if (adminForm.title && adminForm.date && adminForm.instructor) {
      const newWorkshop = {
        ...adminForm,
        id: Date.now().toString(),
        participants: 0,
        rating: 0,
      };

      if (currentWorkshop) {
        setFeaturedWorkshop((prev) => ({ ...prev, ...adminForm }));
      } else {
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

  // Loading state
  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Loading workshops...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && workshops.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="error-container">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
          <button onClick={fetchWorkshops} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
          {featuredWorkshop && (
            <section className="hero">
              <div className="container">
                <div className="hero-content">
                  <div className="hero-text">
                    <div className="workshop-badge">
                      <span>{featuredWorkshop.place || "Online"}</span>
                      <span className="badge-type">WORKSHOP</span>
                    </div>
                    <h1>
                      <span className="hero-title-main">{featuredWorkshop.title}</span>
                      <span className="hero-title-sub">WORKSHOP</span>
                    </h1>
                    <div className="workshop-info">
                      <div className="info-item">
                        <Calendar className="icon" />
                        <span>{formatDate(featuredWorkshop.date)}</span>
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

                      <button className="watch-btn" onClick={() => setIsVideoOpen(true)}>
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
          )}

          {/* Workshop Highlights */}
          <section className="highlights">
            <div className="container">
              <h2>What You'll Learn</h2>
              <div className="highlights-grid">
                <div className="highlight-card">
                  <BookOpen className="highlight-icon" />
                  <h3>Modern Development Patterns</h3>
                  <p>Learn advanced patterns and best practices from industry experts</p>
                </div>
                <div className="highlight-card">
                  <Play className="highlight-icon" />
                  <h3>Hands-on Projects</h3>
                  <p>Build real-world applications with guided coding sessions</p>
                </div>
                <div className="highlight-card">
                  <Users className="highlight-icon" />
                  <h3>Expert Guidance</h3>
                  <p>Get mentorship from industry professionals and networking opportunities</p>
                </div>
              </div>
            </div>
          </section>

          {/* Ongoing Workshops */}
          {ongoingWorkshops.length > 0 && (
            <section className="workshops-section ongoing-workshops">
              <div className="container">
                <h2>Upcoming Workshops</h2>
                <div className="workshops-grid">
                  {ongoingWorkshops.map((workshop, index) => (
                    <WorkshopCard
                      key={workshop.id}
                      workshop={workshop}
                      index={index}
                      isOngoing={true}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Previous Workshops */}
          {previousWorkshops.length > 0 && (
            <section className="workshops-section previous-workshops">
              <div className="container">
                <h2>Previous Workshops</h2>
                <div className="workshops-grid">
                  {previousWorkshops.map((workshop, index) => (
                    <WorkshopCard
                      key={workshop.id}
                      workshop={workshop}
                      index={index}
                      isOngoing={false}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Video Popup */}
          {isVideoOpen && featuredWorkshop && (
            <div className="modal-overlay" onClick={() => setIsVideoOpen(false)}>
              <div className="video-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{isLive ? "Live Workshop" : "Workshop Preview"}</h2>
                  <button className="close-btn" onClick={() => setIsVideoOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="video-container">
                  <iframe
                    src={isLive ? featuredWorkshop.liveVideoUrl : featuredWorkshop.videoUrl}
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
                  <button onClick={handleSubmit} className="submit-btn">
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
                              setAdminForm({ ...adminForm, title: e.target.value })
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
                      {featuredWorkshop && (
                        <div className="workshop-item">
                          <div className="workshop-info">
                            <h4>Featured: {featuredWorkshop.title}</h4>
                            <p>{formatDate(featuredWorkshop.date)}</p>
                          </div>
                          <div className="workshop-actions">
                            <button onClick={() => editWorkshop(featuredWorkshop)}>
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      )}

                      {workshops.map((workshop) => (
                        <div key={workshop.id} className="workshop-item">
                          <div className="workshop-info">
                            <h4>{workshop.title}</h4>
                            <p>{formatDate(workshop.date)}</p>
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
                  <p>Email: workshops@techcraft.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
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
                <p>© 2024 TechCraft. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default WorkshopPage;