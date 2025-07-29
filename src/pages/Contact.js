import React, { useState } from "react";
import { useDynamicCSS } from "../hooks/DynamicCSSLoader";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/ScrollAnimation";
import "../styles/ScrollAnimations.css";

const ContactUs = () => {
  useDynamicCSS("contact");

  // Animation hooks
  const headerAnimation = useScrollAnimation({ threshold: 0.3 });
  const introAnimation = useScrollAnimation({ threshold: 0.2, delay: 200 });
  const contactMethodsAnimation = useStaggeredAnimation(4, {
    threshold: 0.2,
    staggerDelay: 200,
    rootMargin: "0px 0px -50px 0px",
  });
  const formAnimation = useScrollAnimation({ threshold: 0.3, delay: 300 });
  const faqAnimation = useScrollAnimation({ threshold: 0.3, delay: 400 });
  const supportAnimation = useScrollAnimation({ threshold: 0.3, delay: 500 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Replace with your actual backend URL
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        console.log("Form submitted successfully:", result);

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "general",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(""), 5000);
      } else {
        throw new Error(result.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "Failed to send message. Please try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      info: "contact@craftingbrain.com",
      subtext: "24-hour response guarantee",
      description:
        "Send us detailed questions about courses, enrollment, or technical support.",
    },
    {
      icon: "📞",
      title: "Academic Helpline",
      info: "+91##########",
      subtext: "Monday to Friday, 9:00 AM - 6:00 PM IST",
      description:
        "Speak directly with our academic counselors for personalized guidance.",
    },
    {
      icon: "📍",
      title: "India ",
      info: "Hyderabad, Telangana",
      subtext: "Schedule your visit",
      description:
        "Visit our modern learning facility and experience our teaching environment.",
    },
    {
      icon: "💬",
      title: "Live Chat Support",
      info: "Instant Assistance",
      subtext: "Available 24/7",
      description:
        "Get immediate answers to your questions through our live chat system.",
    },
  ];

  const faqItems = [
    {
      question: "What is the duration of the AI & Data Science program?",
      answer:
        "Our comprehensive program spans 6 months with intensive hands-on training. We provide placement support starting from the 2nd month, ensuring you're job-ready by completion.",
      category: "Program Details",
    },
    {
      question: "What prerequisites do I need to join the course?",
      answer:
        "While basic programming knowledge is helpful, it's not mandatory. We start with fundamentals and progressively build advanced concepts. A passion for learning and problem-solving is the most important requirement.",
      category: "Eligibility",
    },
    {
      question: "How are the classes structured and scheduled?",
      answer:
        "We conduct 5 comprehensive sessions per week, each lasting 2.5 hours. Classes are available in multiple time slots including evening batches for working professionals.",
      category: "Schedule",
    },
    {
      question: "What makes your placement guarantee unique?",
      answer:
        "We offer 100% placement assurance with guaranteed stipend starting from the 2nd month. Our industry partnerships and dedicated placement team ensure successful career transitions.",
      category: "Placement",
    },
    {
      question: "What learning resources and support do you provide?",
      answer:
        "Students receive comprehensive study materials, access to industry-standard tools, 1-on-1 mentoring sessions, project guidance, and lifetime access to our learning platform.",
      category: "Learning Support",
    },
    {
      question: "Can I balance this course with my current job?",
      answer:
        "Absolutely! Our flexible scheduling includes evening and weekend batches specifically designed for working professionals. We also provide recorded sessions for review.",
      category: "Flexibility",
    },
  ];

  const supportOptions = [
    {
      title: "Academic Counseling",
      description:
        "Get personalized guidance on course selection and career planning",
      icon: "🎓",
    },
    {
      title: "Technical Support",
      description:
        "Assistance with platform access, software installation, and technical issues",
      icon: "⚙️",
    },
    {
      title: "Career Guidance",
      description:
        "Professional mentoring for interview preparation and job placement",
      icon: "🚀",
    },
    {
      title: "Learning Resources",
      description:
        "Access to additional materials, practice sessions, and study groups",
      icon: "📚",
    },
  ];

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">
        {/* Header Section */}
        <div
          ref={headerAnimation.elementRef}
          className={`contact-header section-title-animate ${headerAnimation.animationClass}`}
        >
          <h1 className="contact-title">Connect With Our Learning Community</h1>
          <p className="contact-subtitle">
            Have questions about our AI & Data Science program? Our education
            specialists are here to guide you on your learning journey.
          </p>
        </div>

        {/* Introduction Section */}
        <div
          ref={introAnimation.elementRef}
          className={`contact-intro educational-fade ${introAnimation.animationClass}`}
        ></div>

        <div className="contact-content">
          {/* Left Side - Contact Information */}
          <div className="contact-info-section">
            {/* Contact Methods Grid */}
            <div className="contact-methods-wrapper">
              <h2 className="section-title">Get in Touch</h2>
              <div
                ref={contactMethodsAnimation.containerRef}
                className="contact-methods stagger-container"
              >
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`contact-method info-card-animate ${contactMethodsAnimation.getItemAnimationClass(
                      index
                    )}`}
                  >
                    <div className="contact-icon">
                      <span>{method.icon}</span>
                    </div>
                    <div className="contact-details">
                      <h3>{method.title}</h3>
                      <p className="contact-info">{method.info}</p>
                      <span className="contact-hours">{method.subtext}</span>
                      <p className="contact-description">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Options */}
            {/* <div className="support-options-wrapper">
              <h2 className="section-title">How We Support You</h2>
              <div className="support-grid">
                {supportOptions.map((option, index) => (
                  <div key={index} className="support-option">
                    <div className="support-icon">{option.icon}</div>
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section">
            <div
              ref={formAnimation.elementRef}
              className={`form-container form-animate ${formAnimation.animationClass}`}
            >
              <div className="form-header">
                <h2>Start Your Learning Journey</h2>
                <p>
                  Complete the form below and our education specialists will
                  contact you within 24 hours to discuss your goals and how we
                  can help you achieve them.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Inquiry Type */}
                <div className="form-section">
                  <label className="form-label">
                    What brings you here today?
                  </label>
                  <div className="form-group">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="general">General Information</option>
                      <option value="course">
                        Course Details & Curriculum
                      </option>
                      <option value="enrollment">Enrollment Process</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="career">Career Guidance</option>
                    </select>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="form-section">
                  <label className="form-label">Personal Information</label>
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
                </div>

                {/* Contact Information Section */}
                <div className="form-section">
                  <label className="form-label">Contact & Subject</label>
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
                </div>

                {/* Message Section */}
                <div className="form-section">
                  <label className="form-label">Your Message</label>
                  <div className="form-group">
                    <label htmlFor="message">
                      Tell us more about your goals *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Share your learning objectives, current background, career goals, or any specific questions you have about our program..."
                      rows="6"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-section">
                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <span>📩</span>
                        Send Message & Start Your Journey
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="success-message">
                    <span>✅</span>
                    <div>
                      <p>
                        <strong>Thank you for reaching out!</strong>
                      </p>
                      <p>
                        Your message has been sent successfully. Our education
                        specialists will contact you within 24 hours to discuss
                        your learning goals.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="error-message">
                    <span>❌</span>
                    <div>
                      <p>
                        <strong>Message not sent</strong>
                      </p>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {/* <div 
          ref={faqAnimation.elementRef}
          className={`faq-section educational-fade ${faqAnimation.animationClass}`}
        >
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our AI & Data Science program. Can't find what you're looking for? Contact us directly!</p>
          </div>
          
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <div className="faq-category">{item.category}</div>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Additional Support Section */}
        <div
          ref={supportAnimation.elementRef}
          className={`additional-support educational-fade ${supportAnimation.animationClass}`}
        >
          <div className="support-content">
            <h2>Need Immediate Assistance?</h2>
            <p>
              Our support team is available to help you with any questions or
              concerns. Whether you need technical help, course information, or
              career guidance, we're here for you.
            </p>
            <div className="support-actions">
              <button
                className="support-btn primary"
                onClick={() =>
                  window.open(
                    "https://api.whatsapp.com/send?phone=+919305009726&text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20services",
                    "_blank"
                  )
                }
              >
                <span>💬</span>
                Start WhatsApp Chat
              </button>
              <button
                className="support-btn secondary"
                onClick={() => {
                  const subject = "Schedule a Call - Course Enquiry";
                  const body = `Hi Crafting Brain,

I hope you're doing well. I'd like to schedule a quick call to enquire about your course details. Please let me know a convenient time for you this week.

Looking forward to connecting.

Best regards,
[Your Name]`;

                  const mailtoLink = `mailto:business@craftingbrain.com?subject=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoLink;
                }}
              >
                <span>📞</span>
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
