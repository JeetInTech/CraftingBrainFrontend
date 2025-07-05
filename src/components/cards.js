import React, { useState } from "react";
import "./cards.css";

const CourseCard = ({ 
  image, 
  title, 
  description, 
  author, 
  role, 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleCardClick = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
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

      {/* Video Popup */}
      {showVideo && (
        <div className="video-popup" onClick={closeVideo}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVideo}>×</button>
            <iframe
              src={videoUrl}
              title="Course Video"
              frameBorder="0"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

// CoursesPage component that displays multiple CourseCards
const CoursesPage = () => {
  return (
    <div className="courses-page">
      <div className="page-header">
        <h1 className="page-title">🚀 Featured Courses</h1>
        <p className="page-subtitle">Master new skills with our expert-led courses</p>
      </div>

      <div className="courses-grid">
        <CourseCard 
          image="https://via.placeholder.com/350x180/667eea/white?text=Graphic+Design"
          title="Complete Graphic Design Course"
          description="Master design principles and create stunning visuals that captivate audiences"
          author="Sarah Johnson"
          role="Design Expert"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
        
        <CourseCard 
          image="https://via.placeholder.com/350x180/764ba2/white?text=Web+Development"
          title="Web Development Bootcamp"
          description="Learn modern web development from scratch with hands-on projects"
          author="David Miller"
          role="Full Stack Developer"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
        
        <CourseCard 
          image="https://via.placeholder.com/350x180/f093fb/white?text=Mobile+Apps"
          title="Mobile App Development"
          description="Build professional mobile applications for iOS and Android platforms"
          author="Marcus Chen"
          role="Mobile Developer"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
        
        <CourseCard 
          image="https://via.placeholder.com/350x180/4ade80/white?text=Digital+Marketing"
          title="Digital Marketing Mastery"
          description="Learn effective marketing strategies for the digital age"
          author="Emma Wilson"
          role="Marketing Expert"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
        
        <CourseCard 
          image="https://via.placeholder.com/350x180/f59e0b/white?text=Data+Science"
          title="Data Science Fundamentals"
          description="Analyze data and build machine learning models from scratch"
          author="Alex Rodriguez"
          role="Data Scientist"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
        
        <CourseCard 
          image="https://via.placeholder.com/350x180/ef4444/white?text=Photography"
          title="Photography Masterclass"
          description="Capture stunning photos and master professional photography techniques"
          author="Lisa Thompson"
          role="Professional Photographer"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
      </div>
    </div>
  );
};

// Export both components
export default CourseCard;
export { CoursesPage };