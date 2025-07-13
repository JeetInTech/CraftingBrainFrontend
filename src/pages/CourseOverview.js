import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseOverview.css";

const CourseOverview = () => {
  const navigate = useNavigate();
  const [showEnrollPopup, setShowEnrollPopup] = useState(false);
  const [showInstructorDetails, setShowInstructorDetails] = useState(false);

  const curriculum = [
    { week: 1, topic: "Introduction to AI & Modern Architectures" },
    { week: 2, topic: "Understanding Attention Mechanism" },
    { week: 3, topic: "Transformers: Theory & Practical Implementation" },
    { week: 4, topic: "Building GPT Models from Scratch" },
    { week: 5, topic: "RAG - Retrieval Augmented Generation" },
    { week: 6, topic: "Hands-on Project: Chatbot with GPT" },
    { week: 7, topic: "Capstone Project & Real-world Use Cases" },
  ];

  const handleEnrollClick = () => {
    setShowEnrollPopup(true);
  };

  const handleClosePopup = () => {
    setShowEnrollPopup(false);
  };

  const handleInstructorClick = () => {
    setShowInstructorDetails(!showInstructorDetails);
  };

  return (
    <div className="page-wrapper">
  <div className="top-right-controls">
    <button className="cta-button" onClick={() => navigate("/Courses")}>Back</button>
    <video src="../assets/CB.mp4" className="logo-video" onClick={() => navigate("/Hero")} autoPlay loop muted />
  </div>

  <div className="overview-grid">
    
    {/* LEFT SECTION */}
    <div className="left-section">
      <h1 className="page-title">Mastering AI with Transformers</h1>
      <p className="page-subtitle">
        Deep dive into the world of Transformers, GPT models, and modern AI with real-world applications.
      </p>

      <div className="instructor-block" onClick={handleInstructorClick}>
        <img src="../assets/instructor-icon.png" alt="Instructor" className="instructor-img" />
        <div className="instructor-details">
          <p className="author-name">Aman Kasaudhan</p>
          <p className="author-role">AI Specialist</p>
        </div>
      </div>

      <button className="cta-button enroll-left" onClick={handleEnrollClick}>Enroll Now</button>
    </div>

    {/* RIGHT SECTION (Instructor details shown on click) */}
    {showInstructorDetails && (
      <div className="right-section">
        <div className="section">
          <h2 className="section-title">Instructor Details</h2>
          <p className="sub-module">
            Aman Kasaudhan is a seasoned AI expert with 7+ years of experience in Transformers and Generative AI. He's mentored thousands globally in mastering AI tools and models.
          </p>
        </div>
      </div>
    )}
  </div>


      {/* Curriculum Roadmap */}
      <div className="section">
        <h2 className="section-title">Course Curriculum</h2>
        <div className="roadmap">
  {curriculum.map((item, index) => (
    <div className="timeline-item" key={item.week}>
      <div className="timeline-circle">{item.week}</div>
      {index !== curriculum.length - 1 && <div className="timeline-line"></div>}
      <div className="timeline-content">
        <strong>Week {item.week}:</strong> {item.topic}
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Enroll Form */}
      {showEnrollPopup && (
        <div className="video-popup">
          <div className="section enroll-form">
            <button className="close-btn" onClick={handleClosePopup}>×</button>
            <h2 className="section-title">Enroll for the Course</h2>
            <form>
              <input type="text" placeholder="Name" required className="form-input" /><br /><br />
              <input type="tel" placeholder="Phone Number" required className="form-input" /><br /><br />
              <input type="email" placeholder="Email" required className="form-input" /><br /><br />
              <select required className="form-input">
                <option value="">Profession</option>
                <option value="Student">Student</option>
                <option value="Working">Working</option>
                <option value="Others">Others</option>
              </select><br /><br />
              <button type="submit" className="cta-button full-width">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="section footer">
        <p>© 2025 Crafting Brain. We Don't Just Build Skills — We Craft Intelligent Minds.</p>
      </footer>
    </div>
  );
};

export default CourseOverview;
