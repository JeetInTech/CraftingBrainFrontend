// src/pages/Courses.js
import React, {  } from "react";

import CourseCard from "../components/cards";
import Footer from "../components/Footer";
import { useDynamicCSS } from '../hooks/DynamicCSSLoader';
// import { useNavigate } from "react-router-dom";

function Courses({ showFooter = true }) {
  useDynamicCSS('course'); 
  useDynamicCSS('cards'); 
  useDynamicCSS('popup');
  // const [expandedModules, setExpandedModules] = useState([]);
  // const navigate = useNavigate();

  // const toggleModule = (index) => {
  //   setExpandedModules((prevExpanded) =>
  //     prevExpanded.includes(index)
  //       ? prevExpanded.filter((i) => i !== index)
  //       : [...prevExpanded, index]
  //   );
  // };

  

  return (
    <div className="page-wrapper">
      <div className="courses-page">
        <div className="page-header">
          <h1 className="page-title">🚀 Featured Courses</h1>
          <p className="page-subtitle">
            Master new skills with our expert-led courses
          </p>
        </div>

        <div className="courses-grid">
          <CourseCard
            image="https://img.freepik.com/premium-vector/vector-illustration-cute-green-python-coding-laptop_831490-4587.jpg"
            title="Module 1: Python Foundations"
            description="Master Python basics and dive into advanced topics like OOP, list comprehensions, and lambda functions for data applications."
            author="Aman Kasaudhan"
            role="Python Developer"
            videoUrl="https://www.youtube.com/embed/DRpts89ecPQ"
            
          />

          <CourseCard
            image="https://www.techslang.com/wp-content/uploads/2021/10/thinking-ai-humanoid-robot-analyzing-screen-mathematics-formula-science-e1634742458866.jpg"
            title="Module 2: Mathematics for Machine Learning"
            description="Cover linear algebra, calculus, and probability/statistics essential for machine learning foundations."
            author="Aman Kasaudhan"
            role="Mathematics Professor"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://media.licdn.com/dms/image/v2/D4D12AQHY5lUTWzltLA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1701542064078?e=2147483647&v=beta&t=LsVnNAZgOAPzoQhazX9dY_l5sUO40-DYjUntMF1JZwc"
            title="Module 3: Statistics for Data Science"
            description="Learn descriptive and inferential statistics, regression analysis, and ANOVA to support data-driven insights."
            author="Aman Kasaudhan"
            role="Data Analyst"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://www.simplilearn.com/ice9/free_resources_article_thumb/machine_learning_terms.jpg"
            title="Module 4: Machine Learning Essentials"
            description="Explore supervised/unsupervised learning algorithms, model evaluation, and performance metrics like F1-score."
            author="Aman Kasaudhan"
            role="ML Engineer"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://www.devprojournal.com/wp-content/uploads/2021/04/cloud-computing-data-696x392.jpg"
            title="Module 5: Databases and Cloud Computing"
            description="Master SQL, NoSQL databases, and cloud platforms for scalable data storage and processing solutions."
            author="Aman Kasaudhan"
            role="Cloud Architect"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhAVN1lexbzD4n7WyoNtpgxIZauHAAdGUyw&s"
            title="Module 6: Deep Learning and NLP"
            description="Build neural networks, understand deep learning architectures, and implement natural language processing models."
            author="Aman Kasaudhan"
            role="AI Researcher"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-0e78-622f-b34a-b514044526e6/raw?se=2025-07-06T11%3A12%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=1d0568ca-f000-516d-9300-fd4b40e4aeb1&skoid=f28c0102-4d9d-4950-baf0-4a8e5f6cf9d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-05T12%3A10%3A42Z&ske=2025-07-06T12%3A10%3A42Z&sks=b&skv=2024-08-04&sig=l3XXn06xazu1y8PQ10L6fzSPj9486jPySLmDMrDHv6M%3D"
            title="Module 7: Transformers, GPT Models, and RAG"
            description="Master modern AI architectures including transformer models, GPT implementations, and retrieval-augmented generation."
            author="Aman Kasaudhan"
            role="AI Specialist"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://skaftenicki.github.io/dtu_mlops/figures/mlops_cycle.png"
            title="Module 8: MLOps and Model Deployment"
            description="Learn to deploy, monitor, and maintain machine learning models in production environments at scale."
            author="Aman Kasaudhan"
            role="DevOps Engineer"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CourseCard
            image="https://www.solulab.com/wp-content/uploads/2024/03/GenAI-Automation.jpg"
            title="Module 9: AI Automation Project"
            description="Leverage AI to automate real-world tasks by integrating machine learning, NLP, and APIs into a functional pipeline."
            author="Aman Kasaudhan"
            role="Senior AI Engineer"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
        </div>
      </div>
    
      
      
      

      


      
      

      {showFooter && <Footer />}
    </div>
  );
}

export default Courses;
