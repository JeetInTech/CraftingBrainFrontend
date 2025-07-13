import React from 'react';
import './WorkshopCards.css';



const WorkshopCard = ({ videoUrl, title, description, author, date, time, place,registerLink }) => {
  return (

    <div className="workshop-card">
      {/* Video Section */}
      <div className="workshop-video">
        <iframe
          src={videoUrl}
          title={title}
          allowFullScreen
        ></iframe>
      </div>

      {/* Info Section */}
      <div className="workshop-info">
        <h3 className="workshop-title">{title}</h3>
        <p className="workshop-description">{description}</p>
        <div className="workshop-author">
          <strong>By: {author}
          <div className="workshop-details"> Date: {date} <br></br>Time: {time} <br></br> Meet: {place}</div></strong> 
        </div>
        
        <a href={registerLink} className="register-button" target="_blank" rel="noopener noreferrer">
          Register 🚀
        </a>
      </div>
    </div>

  );
};

export default WorkshopCard;
