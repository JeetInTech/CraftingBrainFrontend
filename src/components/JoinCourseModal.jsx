// --- Updated JoinCourseModal.jsx ---

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JoinCourseModal.css";

const JoinCourseModal = ({ isOpen, onClose, course }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    profession: "",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        courseTitle: course.title,
        courseSlug: course.slug,
      };
      await axios.post("https://u3je1y4ty7.execute-api.us-east-1.amazonaws.com/visitors/visitors", payload);
      alert("Successfully submitted!");
      onClose();
    } catch (error) {
      alert("Submission failed. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !course) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="modal-title">Join {course.title}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter your ${key}`}
                required
                className="form-input"
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default JoinCourseModal;