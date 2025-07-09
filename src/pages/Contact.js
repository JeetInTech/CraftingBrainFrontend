import React, { useState } from 'react';
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';
const ContactUs = () => {
  useDynamicCSS('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        console.log('Form submitted successfully:', result);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">
        
        {/* Header Section */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about our AI & Data Science program? We're here to help you start your journey.
          </p>
        </div>

        <div className="contact-content">
          
          {/* Left Side - Contact Information */}
          <div className="contact-info-section">
            {/* Contact Methods Grid */}
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <span>📧</span>
                </div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>contact@craftingbrain.com</p>
                  <span>We'll respond within 24 hours</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <span>📞</span>
                </div>
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>+91 98765 43210</p>
                  <span>Mon-Fri, 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <span>📍</span>
                </div>
                <div className="contact-details">
                  <h3>Location</h3>
                  <p>Hyderabad, Telangana</p>
                  <span>Visit us by appointment</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <span>💬</span>
                </div>
                <div className="contact-details">
                  <h3>Quick Contact</h3>
                  <p>Available 24/7</p>
                  <span>Instant support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section">
            <div className="form-container">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* Inquiry Type */}
                <div className="form-group">
                  <label htmlFor="inquiryType">What can we help you with?</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="course">Course Information</option>
                    <option value="enrollment">Enrollment Support</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Career Guidance</option>
                  </select>
                </div>

                {/* Name and Email Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Brief subject line"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us more about your inquiry or how we can help you..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="success-message">
                    <span>✅</span>
                    <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="error-message">
                    <span>❌</span>
                    <p>{errorMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long is the course?</h3>
              <p>Our comprehensive AI & Data Science program is 6 months long with placement support starting from the 2nd month.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need prior experience?</h3>
              <p>Basic familiarity with programming is helpful but not required. We start from fundamentals and build up gradually.</p>
            </div>
            <div className="faq-item">
              <h3>What's the class schedule?</h3>
              <p>We have 5 sessions per week, 2.5 hours each, with flexible timing options to accommodate working professionals.</p>
            </div>
            <div className="faq-item">
              <h3>Is placement guaranteed?</h3>
              <p>Yes! We provide 100% placement assurance with a guaranteed stipend starting from the end of the 2nd month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;