
import WorkshopCard from "../components/WorkshopCards";
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';


function Courses({ showFooter = true }) {
  useDynamicCSS('course');
  useDynamicCSS('workshop'); 
  useDynamicCSS('popup');


  return (
    <div className="page-wrapper">
      <div className="courses-page">
        <div className="page-header">
          <h1 className="page-title">🎤 Workshops Events & MORE</h1>
          <p className="page-subtitle">
            Explore The World Of Technology 
          </p>
        </div>

        <div className="courses-grid">
          <WorkshopCard
            videoUrl="https://www.youtube.com/embed/DRpts89ecPQ"
            title="Python Foundations"
            description="Master Python basics and dive into advanced topics like OOP, list comprehensions, and lambda functions for data applications."
            author="Aman Kasaudhan"
            date= "12/07/2025"
            time = "5 PM"
            place = "Google Meet"
            registerLink="https://example.com/register/python"
          />

          <WorkshopCard
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Mathematics for Machine Learning"
            description="Cover linear algebra, calculus, and probability/statistics essential for machine learning foundations."
            author="Aman Kasaudhan"
            date= "12/07/2025"
            time = "5 PM"
            place = "Google Meet"
            registerLink="https://example.com/register/math"
          />
          <WorkshopCard
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Agentic AI"
            description="Discover how agentic AI works and create one"
            author="Aman Kasaudhan"
            date= "12/07/2025"
            time = "5 PM"
            place = "Google Meet"
            registerLink="https://example.com/register/agent"
          />

          
        </div>
      </div>
    
      
      
      

      


      
      


    </div>
  );
}

export default Courses;
