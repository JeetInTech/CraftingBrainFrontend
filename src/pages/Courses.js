// src/pages/Course.js
import React, { useState } from 'react';
import './Course.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import BlogCard from "../components/cards";

function Course({ showFooter = true }) {
  const [expandedModules, setExpandedModules] = useState([]);
  const navigate = useNavigate();

  const toggleModule = (index) => {
    setExpandedModules((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index)
        : [...prevExpanded, index]
    );
  };

  const handleEnrollNow = () => {
    navigate('/payment');
  };
 

  return (
    <div className="page-wrapper">

      <div className="card-container">
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Top Graphic Design Courses Online"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="SamuyI Joshi"
        role="Graphics Designer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Best Web Design Courses Online in 2021"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Devid Millar"
        role="Web Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
    </div>
    <div className="card-container">
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Top Graphic Design Courses Online"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="SamuyI Joshi"
        role="Graphics Designer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Best Web Design Courses Online in 2021"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Devid Millar"
        role="Web Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
    </div>

      {/* YouTube Video Embed */}
      <div className="youtube-video">
        <iframe
          src="https://www.youtube.com/embed/yX8gOO_VLbk"
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <section className="section">
        <h2 className="section-title">Course Overview</h2>
        <p>
          Step into the future of AI and Data Science with our exclusive program in collaboration with Inikola.
          This hands-on internship includes intensive projects, expert mentorship, and 100% placement assurance starting by the end of the second month.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Key Highlights and Features</h2>
        <ul className="highlights-list">
          <li>Practical Projects with real-world data</li>
          <li>Mentorship from AI expert Aman Kasaudhan</li>
          <li>100% Placement Assurance beginning from the second month</li>
          <li>Guaranteed Stipend of ₹10,000/month</li>
          <li>Internship Experience Letter from Inikola</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Curriculum</h2>

        {[
          {
            title: 'Module 1: Python Foundations',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Python Programming</h4>
                  <p>Master Python basics, including data types, control structures, functions, and libraries such as Pandas and NumPy for data manipulation.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Advanced Python for Data Science</h4>
                  <p>Dive into advanced topics like list comprehensions, lambda functions, and object-oriented programming (OOP) to build complex data applications.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 2: Mathematics for Machine Learning',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Linear Algebra</h4>
                  <p>Learn about vectors, matrices, and matrix operations, crucial for understanding transformations in machine learning algorithms.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Calculus</h4>
                  <p>Understand derivatives and integrals, which are used to optimize machine learning models.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Probability and Statistics</h4>
                  <p>Explore concepts like random variables, probability distributions, and statistical inference to support model development and evaluation.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 3: Statistics for Data Science',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Descriptive Statistics</h4>
                  <p>Summarize data using measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation).</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Inferential Statistics</h4>
                  <p>Learn hypothesis testing, confidence intervals, and p-values to make data-driven decisions.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Statistical Modeling</h4>
                  <p>Develop skills in correlation, regression analysis, and ANOVA for predicting and interpreting data trends.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 4: Machine Learning Essentials',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Supervised Learning</h4>
                  <p>Explore algorithms for regression and classification, including linear regression, logistic regression, decision trees, and SVMs.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Unsupervised Learning</h4>
                  <p>Uncover patterns in data using clustering techniques like K-means and hierarchical clustering.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Model Evaluation</h4>
                  <p>Learn metrics like accuracy, precision, recall, and F1-score to assess model performance.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 5: Databases and Cloud Computing',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">SQL & NoSQL Databases</h4>
                  <p>Gain proficiency in SQL for structured data management and NoSQL for handling unstructured data.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Cloud Services</h4>
                  <p>Introduction to AWS, Google Cloud, and Azure for scalable data storage and machine learning deployment.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 6: Deep Learning and NLP',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Neural Networks</h4>
                  <p>Understand CNNs and RNNs, foundational deep learning models for image and sequential data processing.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">NLP Fundamentals</h4>
                  <p>Explore tokenization, embeddings, and sentiment analysis to interpret text data.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 7: Transformers, GPT Models, and RAG',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">Transformers</h4>
                  <p>Study transformer models like BERT and GPT, focusing on architecture and applications in NLP.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">RAG & LangChain</h4>
                  <p>Learn how Retrieval-Augmented Generation and LangChain improve AI by combining retrieval with generation.</p>
                </div>
              </>
            )
          },
          {
            title: 'Module 8: MLOps and Model Deployment',
            content: (
              <>
                <div className="sub-module">
                  <h4 className="sub-module-title">MLOps Practices</h4>
                  <p>Implement CI/CD pipelines, model versioning, and monitoring for reliable ML model management.</p>
                </div>
                <div className="sub-module">
                  <h4 className="sub-module-title">Deployment Strategies</h4>
                  <p>Deploy models using APIs and cloud services for real-world applications.</p>
                </div>
              </>
            )
          },
        ].map((module, index) => (
          <div key={index} className="accordion">
            <div className="accordion-header" onClick={() => toggleModule(index)}>
              {module.title}
              <span>{expandedModules.includes(index) ? '-' : '+'}</span>
            </div>
            <div className={`accordion-content ${expandedModules.includes(index) ? 'expanded' : ''}`}>
              {module.content}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Instructor Bio</h2>
        <p>
          <strong>Instructor:</strong> Aman Kasaudhan <br />
          <strong>Bio:</strong> Aman Kasaudhan is a data science and AI expert with a wealth of experience in machine learning, data analysis, and deep learning applications. Known for his approachable teaching style and hands-on guidance, Aman has mentored hundreds of students to successful careers in tech. With extensive experience in building real-world AI solutions, he brings both theory and practice to life in each session, ensuring every student is fully equipped for their career.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Eligibility and Requirements</h2>
        <p>
          <strong>Ideal for:</strong> Graduates, engineers, and tech enthusiasts looking to break into AI and data science.<br />
          <strong>Requirements:</strong> Basic familiarity with Python and a commitment to learning and problem-solving. This program is accessible to beginners and career changers alike.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Course Duration and Schedule</h2>
        <p>
          <strong>Duration:</strong> 6 months, with placement starting by the end of the second month.<br />
          <strong>Weekly Live Sessions:</strong> Five sessions each week, 2.5 hours each (3 by Crafting Brain, 2 by Inikola).<br />
          <strong>Flexible Learning:</strong> Recorded sessions, on-demand resources, and additional support to accommodate various schedules.
        </p>
      </section>

      <button className="cta-button" onClick={handleEnrollNow}>
        Enroll Now – Limited Spots Available!
      </button>

      {showFooter && <Footer />}
    </div>
    
  );
}

export default Course;