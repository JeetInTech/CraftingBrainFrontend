import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JoinCourseModal.css";
import { useNavigate } from "react-router-dom";

const JoinCourseModal = ({ isOpen, onClose, course }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    profession: "",
    country: "",
    state: "",
    city: "",
  });

  // Toast functionality
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const payload = {
        ...formData,
        courseTitle: course.title,
        courseSlug: course.slug,
        timestamp: new Date().toISOString(),
      };
      
      await axios.post(
        "https://u3je1y4ty7.execute-api.us-east-1.amazonaws.com/visitors/visitors", 
        payload,
        {
          timeout: 10000, // 10 second timeout
        }
      );
      
      // Success - show custom toast and navigate
      showToast("🎉 Successfully enrolled! Redirecting to payment...", 'success', 3000);
      
      // Close modal and navigate after a short delay
      setTimeout(() => {
        onClose();
        navigate('/payment');
      }, 1500);
      
    } catch (error) {
      console.error("Submission error:", error);
      setError("Submission failed. Please check your connection and try again.");
      showToast("❌ Submission failed. Please try again.", 'error', 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose, isLoading]);

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        profession: "",
        country: "",
        state: "",
        city: "",
      });
      setError("");
      setIsLoading(false);
      setToasts([]); // Clear toasts when modal closes
    }
  }, [isOpen]);

  if (!isOpen || !course) return null;

  return (
    <>
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast ${toast.type} ${toast.removing ? 'removing' : ''}`}
          >
            <div className="toast-content">
              <div className="toast-icon">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '❌'}
                {toast.type === 'warning' && '⚠️'}
              </div>
              <div className="toast-message">{toast.message}</div>
              <button 
                className="toast-close" 
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
            <div className="toast-progress"></div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="join-modal-overlay" onClick={handleOverlayClick}>
        <div className="join-modal-box">
          <button 
            className="join-modal-close-btn" 
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close modal"
          >
            ✕
          </button>
          
          <h2 className="join-modal-title">
            Join {course.title}
          </h2>

          <div className="course-info">
            <div className="course-info-text">You're enrolling in:</div>
            <div className="course-name">{course.title}</div>
          </div>

          {error && (
            <div style={{ 
              background: 'rgba(255, 84, 112, 0.1)', 
              border: '1px solid rgba(255, 84, 112, 0.3)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '15px',
              color: '#ff5470',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="join-modal-form">
            {/* Personal Information Row */}
            <div className="form-row">
              <div className="join-form-group">
                <label htmlFor="name" className="join-form-label">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
              <div className="join-form-group">
                <label htmlFor="phone" className="join-form-label">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
            </div>

            {/* Email Row */}
            <div className="form-row single">
              <div className="join-form-group">
                <label htmlFor="email" className="join-form-label">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
            </div>

            {/* Profession Row */}
            <div className="form-row single">
              <div className="join-form-group">
                <label htmlFor="profession" className="join-form-label">
                  Current Profession
                </label>
                <input
                  id="profession"
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Student, Developer, Analyst, etc."
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
            </div>

            {/* Location Row */}
            <div className="form-row">
              <div className="join-form-group">
                <label htmlFor="country" className="join-form-label">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
              <div className="join-form-group">
                <label htmlFor="state" className="join-form-label">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
            </div>

            {/* City Row */}
            <div className="form-row single">
              <div className="join-form-group">
                <label htmlFor="city" className="join-form-label">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  disabled={isLoading}
                  className="join-form-input"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`join-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Enroll Now'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinCourseModal;