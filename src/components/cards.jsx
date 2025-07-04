import React from "react";
import "./cards.css";

const BlogCard = ({ image, title, description, author, role, date, authorImage }) => {
  return (
    <div className="blog-card">
      <img src={image} alt="Course" className="card-image" />

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="card-footer">
          <div className="author-info">
            <img src={authorImage} alt="Author" className="author-image" />
            <div>
              <p className="author-name">By {author}</p>
              <p className="author-role">{role}</p>
            </div>
          </div>

          <div className="card-date">
            <p>Date</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;