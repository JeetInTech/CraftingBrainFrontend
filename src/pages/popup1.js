import React, { useState } from "react";
import "./cards.css";
import "./popup.css"; // Import the popup styles

const CourseCard = ({ 
  image, 
  title, 
  description, 
  author, 
  role, 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  courseDetails
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleCardClick = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  const handleEnrollClick = () => {
    console.log('Enrolling with referral code:', referralCode);
    // Handle enrollment logic here
    // Navigate to payment page or show enrollment modal
  };

  return (
    <>
      <div className="course-card" onClick={handleCardClick}>
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
          <div className="play-overlay">
            <div className="play-button">
              <span className="play-icon">▶</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          
          <div className="author-info">
            <div className="author-details">
              <p className="author-name">By {author}</p>
              <p className="author-role">{role}</p>
            </div>
            <button className="enroll-btn" onClick={(e) => e.stopPropagation()}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Video Popup with Course Details Layout */}
      {showVideo && (
        <div className="video-popup" onClick={closeVideo}>
          <div className="video-container-detailed" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVideo}>×</button>
            
            {/* Course Detail Container Inside Popup */}
            <div className="course-detail-container">
              
              {/* Left Side - Course Details */}
              <div className="course-details-left">
                <h1>{title}</h1>
                
                <h2>Course Overview</h2>
                <p>{description}</p>

                <h2>What You'll Learn</h2>
                <ul>
                  {courseDetails?.learningPoints?.map((point, index) => (
                    <li key={index}>{point}</li>
                  )) || [
                    "Industry-relevant practical skills",
                    "Hands-on project experience", 
                    "Expert mentorship and guidance",
                    "Real-world problem solving",
                    "Portfolio development",
                    "Career preparation"
                  ]}
                </ul>

                <h2>Key Features</h2>
                <ul>
                  <li>Expert instruction from {author}</li>
                  <li>Hands-on practical projects</li>
                  <li>Industry-standard tools and techniques</li>
                  <li>Certificate of completion</li>
                  <li>Lifetime access to course materials</li>
                  <li>Community support and networking</li>
                </ul>

                <h2>Course Content</h2>
                <p>
                  This comprehensive module covers all essential topics with practical 
                  implementations, real-world examples, and industry best practices. 
                  You'll work on projects that demonstrate your skills and build a 
                  portfolio that showcases your expertise to potential employers.
                </p>
                
                <h3>Prerequisites</h3>
                <p>
                  Basic understanding of programming concepts is helpful but not required. 
                  This course is designed for beginners and intermediate learners looking 
                  to advance their skills in the field.
                </p>

                <h3>Learning Outcomes</h3>
                <p>
                  By the end of this module, you'll have the confidence and skills to 
                  tackle real-world challenges and build impressive projects that 
                  demonstrate your expertise.
                </p>
              </div>

              {/* Right Side - Video + Enrollment Section */}
              <div className="course-enrollment-right">
                
                {/* Course Preview Video */}
                <div className="course-preview-video">
                  <iframe
                    src={videoUrl}
                    title="Course Preview"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Duration */}
                <div className="course-info-card">
                  <div className="info-label">Module Duration</div>
                  <div className="info-value">{courseDetails?.duration || "4-6 Weeks"}</div>
                </div>

                {/* Schedule */}
                <div className="course-info-card">
                  <div className="info-label">Weekly Sessions</div>
                  <div className="info-value">{courseDetails?.schedule || "2-3 Sessions"}</div>
                </div>

                {/* Pricing */}
                <div className="course-info-card">
                  <div className="info-label">Module Access</div>
                  <div className="price-value">
                    Included
                    <span style={{fontSize: '0.8rem', color: 'var(--secondary-text)', display: 'block'}}>
                      in Full Course
                    </span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="course-info-card">
                  <div className="info-label">Instructor</div>
                  <div className="info-value">{author}</div>
                  <div style={{fontSize: '0.9rem', color: 'var(--secondary-text)', marginTop: '5px'}}>
                    {role}
                  </div>
                </div>

                {/* Benefits */}
                <ul className="benefits-list">
                  <li>Hands-on Projects</li>
                  <li>Industry Tools & Techniques</li>
                  <li>Expert Mentorship</li>
                  <li>Certificate of Completion</li>
                  <li>Lifetime Access</li>
                  <li>Career Support</li>
                </ul>

                {/* Referral Code Input */}
                <div className="referral-section">
                  <label className="referral-label">
                    Have a Referral Code? (Optional)
                  </label>
                  <input
                    type="text"
                    className="referral-input"
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                </div>

                {/* Enroll Button */}
                <button className="enroll-main-btn" onClick={handleEnrollClick}>
                  Enroll in Full Course
                </button>
                
                <p style={{
                  fontSize: '0.85rem', 
                  color: 'var(--secondary-text)', 
                  textAlign: 'center', 
                  marginTop: '15px',
                  opacity: 0.8
                }}>
                  Get access to all 9 modules + placement support
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;