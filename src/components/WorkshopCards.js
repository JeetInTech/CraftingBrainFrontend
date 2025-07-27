import React from 'react';
import './WorkshopCards.css';

const WorkshopCard = ({ 
  videoUrl, 
  title, 
  description, 
  author, 
  date, 
  time, 
  place, 
  registerLink 
}) => {
  return (
    <div className="workshop-card">
      {/* Video Section */}
      <div className="workshop-video">
        <iframe
          src={videoUrl}
          title={title}
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>

      {/* Info Section */}
      <div className="workshop-info">
        <h3 className="workshop-title">{title}</h3>
        <p className="workshop-description">{description}</p>
        
        <div className="workshop-author">
          <div className="author-name">By: {author}</div>
          <div className="workshop-details">
            <div className="detail-item">Date: {date}</div>
            <div className="detail-item">Time: {time}</div>
            <div className="detail-item">Meet: {place}</div>
          </div>
        </div>
        
        <a 
          href={registerLink} 
          className="register-button" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Register 🚀
        </a>
      </div>
    </div>
  );
};

export default WorkshopCard;