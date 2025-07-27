// Enhanced CourseCard.js with improved dark theme support and unique class names
import React, { useState, useEffect } from "react";
import { useDynamicCSS } from "../hooks/DynamicCSSLoader";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  image,
  title,
  description,
  author,
  role,
  videoUrl,
  courseDetails,
  index = 0, // For staggered animations
}) => {
  useDynamicCSS("popup");
  const [showVideo, setShowVideo] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100 + (index * 150)); // Staggered loading

    return () => clearTimeout(timer);
  }, [index]);

  const handleCardClick = (e) => {
    // Prevent card click when clicking on enroll button
    if (e.target.closest('.main-enroll-btn')) return;
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    console.log("Enrolling with referral code:", referralCode);
    navigate('/coursespage');
  };

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className="main-course-card loading">
        <div className="main-card-image-container">
          <div className="main-card-image"></div>
        </div>
        <div className="main-card-content">
          <div className="main-card-title"></div>
          <div className="main-card-description"></div>
          <div className="main-author-info">
            <div className="main-author-details">
              <div className="main-author-name"></div>
              <div className="main-author-role"></div>
            </div>
            <div className="main-enroll-btn"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="main-course-card" 
        onClick={handleCardClick}
        style={{ 
          animationDelay: `${0.1 + (index * 0.1)}s`,
          '--card-index': index 
        }}
      >
        <div className="main-card-image-container">
          <img 
            src={image} 
            alt={title} 
            className="main-card-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjAyMDIwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD4KPC9zdmc+';
            }}
          />
          <div className="main-play-overlay">
            <div className="main-play-button">
              <span className="main-play-icon">▶</span>
            </div>
          </div>
        </div>

        <div className="main-card-content">
          <h3 className="main-card-title">{title}</h3>
          <p className="main-card-description">{description}</p>

          <div className="main-author-info">
            <div className="main-author-details">
              <p className="main-author-name">By {author}</p>
              <p className="main-author-role">{role}</p>
            </div>
            <button 
              className="main-enroll-btn" 
              onClick={handleEnrollClick}
              aria-label={`Enroll in ${title}`}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Video Popup Modal */}
      {showVideo && (
        <div className="main-video-popup" onClick={closeVideo}>
          <div
            className="main-video-container-detailed"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="main-close-btn" 
              onClick={closeVideo}
              aria-label="Close video popup"
            >
              ×
            </button>

            <div className="main-course-detail-container">
              {/* Left Side - Course Details */}
              <div className="main-course-details-left">
                <h1 className="main-course-popup-title">{title}</h1>

                <section className="main-course-section">
                  <h2>Course Overview</h2>
                  <p>{description}</p>
                </section>

                <section className="main-course-section">
                  <h2>What You'll Learn</h2>
                  <ul className="main-learning-points">
                    {courseDetails?.learningPoints?.map((point, index) => (
                      <li key={index}>{point}</li>
                    )) || [
                      "Industry-relevant practical skills",
                      "Hands-on project experience",
                      "Expert mentorship and guidance",
                      "Real-world problem solving",
                      "Portfolio development",
                      "Career preparation",
                    ]}
                  </ul>
                </section>

                <section className="main-course-section">
                  <h2>Key Features</h2>
                  <ul className="main-key-features">
                    <li>Expert instruction from {author}</li>
                    <li>Hands-on practical projects</li>
                    <li>Industry-standard tools and techniques</li>
                    <li>Certificate of completion</li>
                    <li>Lifetime access to course materials</li>
                    <li>Community support and networking</li>
                  </ul>
                </section>

                <section className="main-course-section">
                  <h2>Course Content</h2>
                  <p>
                    This comprehensive module covers all essential topics with
                    practical implementations, real-world examples, and industry
                    best practices. You'll work on projects that demonstrate your
                    skills and build a portfolio that showcases your expertise to
                    potential employers.
                  </p>
                </section>

                <section className="main-course-section">
                  <h3>Prerequisites</h3>
                  <p>
                    Basic understanding of programming concepts is helpful but not
                    required. This course is designed for beginners and
                    intermediate learners looking to advance their skills in the
                    field.
                  </p>
                </section>

                <section className="main-course-section">
                  <h3>Learning Outcomes</h3>
                  <p>
                    By the end of this module, you'll have the confidence and
                    skills to tackle real-world challenges and build impressive
                    projects that demonstrate your expertise.
                  </p>
                </section>
              </div>

              {/* Right Side - Video + Enrollment Section */}
              <div className="main-course-enrollment-right">
                {/* Course Preview Video */}
                <div className="main-course-preview-video">
                  <iframe
                    src={videoUrl}
                    title="Course Preview"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>

                {/* Course Info Cards */}
                <div className="main-course-info-cards">
                  <div className="main-course-info-card">
                    <div className="main-info-label">Module Duration</div>
                    <div className="main-info-value">
                      {courseDetails?.duration || "4-6 Weeks"}
                    </div>
                  </div>

                  <div className="main-course-info-card">
                    <div className="main-info-label">Weekly Sessions</div>
                    <div className="main-info-value">
                      {courseDetails?.schedule || "2-3 Sessions"}
                    </div>
                  </div>

                  <div className="main-course-info-card">
                    <div className="main-info-label">Module Access</div>
                    <div className="main-price-value">
                      Included
                      <span className="main-price-subtitle">
                        in Full Course
                      </span>
                    </div>
                  </div>

                  <div className="main-course-info-card">
                    <div className="main-info-label">Instructor</div>
                    <div className="main-info-value">{author}</div>
                    <div className="main-instructor-role">{role}</div>
                  </div>
                </div>

                {/* Benefits List */}
                <ul className="main-benefits-list">
                  <li>Hands-on Projects</li>
                  <li>Industry Tools & Techniques</li>
                  <li>Expert Mentorship</li>
                  <li>Certificate of Completion</li>
                  <li>Lifetime Access</li>
                  <li>Career Support</li>
                </ul>

                {/* Referral Code Input */}
                <div className="main-referral-section">
                  <label className="main-referral-label">
                    Have a Referral Code? (Optional)
                  </label>
                  <input
                    type="text"
                    className="main-referral-input"
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                </div>

                {/* Enroll Button */}
                <button 
                  className="main-enroll-main-btn" 
                  onClick={handleEnrollClick}
                >
                  Enroll in Full Course
                </button>

                <p className="main-enrollment-note">
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