// src/components/Enroll.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";
import JoinCourseModal from "./JoinCourseModal";

const Enroll = () => {
  const [expandedModule, setExpandedModule] = useState(1);
  const [showAllWeeks, setShowAllWeeks] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state?.course;
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnrollClick = () => {
    // navigate("/payment");
    setSelectedCourse(courseData);
  };

  // Complete 24-week curriculum data
  const allModuleData = [
    // Python (4 Weeks) - Weeks 1-4
    {
      id: 1,
      week: 1,
      title: "PYTHON FUNDAMENTALS",
      subtitle: "Control Flow & Data Types",
      liveSessions: 3,
      assignments: 2,
      category: "python",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🐍",
          title: "Python Fundamentals, Control Flow Statements",
          locked: false,
        },
        {
          type: "LIVE LESSON",
          icon: "📊",
          title: "Python Data Types (List, Tuple, Dict, Set, Strings, Numbers)",
          locked: false,
        },
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "Python Loops (For, While, Nested Loops)",
          locked: false,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Basic Problem-Solving Practice",
          locked: false,
        },
      ],
    },
    {
      id: 2,
      week: 2,
      title: "PYTHON FUNCTIONS & CLOUD",
      subtitle: "APIs & AWS Introduction",
      liveSessions: 3,
      assignments: 2,
      category: "python",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "⚡",
          title: "Python Functions (*args, **kwargs)",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔧",
          title: "Lambda, map(), filter(), reduce(), break, continue, pass",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🌐",
          title: "API Creation using Python (FastAPI/Flask)",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "AWS Setup & Services Overview Practice",
          locked: true,
        },
      ],
    },
    {
      id: 3,
      week: 3,
      title: "OOP & CLOUD IMPLEMENTATION",
      subtitle: "Classes, Objects & AWS",
      liveSessions: 3,
      assignments: 2,
      category: "python",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🏗️",
          title: "Classes, Objects, Instance & Class Variables",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "Constructors, Polymorphism, Inheritance",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📦",
          title: "Package Creation using Python OOP",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "AWS Deployment & Cloud Storage Project",
          locked: true,
        },
      ],
    },
    {
      id: 4,
      week: 4,
      title: "ADVANCED PYTHON & INTERVIEW",
      subtitle: "Interview Preparation",
      liveSessions: 3,
      assignments: 3,
      category: "python",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "📝",
          title: "Basic Python Interview Practice",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "Medium Python Interview Practice",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🏆",
          title: "Competitive Python Interview Practice",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Cloud API Integration Project",
          locked: true,
        },
      ],
    },

    // Data Engineering (2 Weeks) - Weeks 5-6
    {
      id: 5,
      week: 5,
      title: "WEB AUTOMATION & AI SCRAPING",
      subtitle: "Selenium & Social Media",
      liveSessions: 3,
      assignments: 2,
      category: "data-engineering",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🤖",
          title: "Selenium Setup & Basics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📱",
          title: "Social Media Automation Package",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🧠",
          title: "AI-Based Data Extraction",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Instagram Followers Automation Project",
          locked: true,
        },
      ],
    },
    {
      id: 6,
      week: 6,
      title: "DATA ENGINEERING PIPELINES",
      subtitle: "ETL & BigQuery",
      liveSessions: 3,
      assignments: 2,
      category: "data-engineering",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "Data Pipeline for Form Data",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "☁️",
          title: "Social Media Data Pipeline (GCP, BigQuery)",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "⚙️",
          title: "ETL for BigQuery using Python",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "End-to-End Data Pipeline Project",
          locked: true,
        },
      ],
    },

    // SQL (3 Weeks) - Weeks 7-9
    {
      id: 7,
      week: 7,
      title: "SQL FUNDAMENTALS",
      subtitle: "Database & Basic Operations",
      liveSessions: 3,
      assignments: 2,
      category: "sql",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🗄️",
          title: "What is Database and Query Languages",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔧",
          title: "CRUD Operations and Aggregations in SQL",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔗",
          title: "Joins in SQL",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Basic SQL Queries Practice",
          locked: true,
        },
      ],
    },
    {
      id: 8,
      week: 8,
      title: "ADVANCED SQL OPERATIONS",
      subtitle: "Subqueries & Analytics",
      liveSessions: 3,
      assignments: 2,
      category: "sql",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔍",
          title: "Subquery: Correlated and Non-Correlated",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📊",
          title: "Analytical Functions in SQL",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🗂️",
          title: "Normalization & Transactions in SQL",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Advanced SQL Analytics Practice",
          locked: true,
        },
      ],
    },
    {
      id: 9,
      week: 9,
      title: "SQL PROJECT WEEK",
      subtitle: "Hands-on Implementation",
      liveSessions: 2,
      assignments: 2,
      category: "sql",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🏗️",
          title: "SQL Project Implementation - Part 1",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "SQL Project Implementation - Part 2",
          locked: true,
        },
        {
          type: "PROJECT",
          icon: "🏆",
          title: "Final SQL Project Presentation",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Complete SQL Portfolio Project",
          locked: true,
        },
      ],
    },

    // Machine Learning (5 Weeks) - Weeks 10-14
    {
      id: 10,
      week: 10,
      title: "DATA HANDLING & CLEANING",
      subtitle: "Pandas & NumPy Mastery",
      liveSessions: 3,
      assignments: 2,
      category: "machine-learning",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🐼",
          title: "Understanding Pandas",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔢",
          title: "Understanding NumPy",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🧹",
          title: "Statistical Operations & Data Cleaning - Part 1",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Data Cleaning Practice Project",
          locked: true,
        },
      ],
    },
    {
      id: 11,
      week: 11,
      title: "DATA ANALYSIS & PREPROCESSING",
      subtitle: "Advanced Analytics",
      liveSessions: 3,
      assignments: 2,
      category: "machine-learning",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "📈",
          title: "Statistical Operations & Data Cleaning - Part 2",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📊",
          title: "Data Analysis using Pandas (GroupBy, PivotTable)",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "⚙️",
          title: "Data Preprocessing in Pandas and NumPy",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Advanced Data Analysis Project",
          locked: true,
        },
      ],
    },
    {
      id: 12,
      week: 12,
      title: "TRANSITION TO MACHINE LEARNING",
      subtitle: "Linear & Logistic Regression",
      liveSessions: 3,
      assignments: 2,
      category: "machine-learning",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "Data Preprocessing, Transformation, Outlier Handling",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📈",
          title: "Introduction to Supervised Learning, Linear Regression",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "Linear Regression from Scratch & Logistic Regression",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Regression Models Implementation",
          locked: true,
        },
      ],
    },
    {
      id: 13,
      week: 13,
      title: "CORE ML ALGORITHMS",
      subtitle: "Classification & Trees",
      liveSessions: 3,
      assignments: 2,
      category: "machine-learning",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "KNN & Naive Bayes - Math + Code",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🌳",
          title: "Decision Tree - Regression & Classification",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🌲",
          title: "Random Forest Classifier & Regressor",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Classification Algorithms Project",
          locked: true,
        },
      ],
    },
    {
      id: 14,
      week: 14,
      title: "UNSUPERVISED LEARNING",
      subtitle: "Clustering & Dimensionality",
      liveSessions: 3,
      assignments: 2,
      category: "machine-learning",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🎪",
          title: "K-Means Clustering & Dimensionality Reduction",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔗",
          title: "Hierarchical Clustering & DBSCAN",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📊",
          title: "Silhouette Score - Project Implementation",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Clustering Analysis Project",
          locked: true,
        },
      ],
    },

    // Neural Networks (3 Weeks) - Weeks 15-17
    {
      id: 15,
      week: 15,
      title: "NEURAL NETWORKS & PERCEPTRONS",
      subtitle: "ANN & CNN Mathematics",
      liveSessions: 3,
      assignments: 2,
      category: "neural-networks",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🧠",
          title: "Introduction to Neural Networks & Perceptron Algorithm",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔢",
          title: "Artificial Neural Networks (ANN): Complete Mathematics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "👁️",
          title: "Convolutional Neural Networks (CNN): Complete Mathematics",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "ANN & CNN Implementation Projects",
          locked: true,
        },
      ],
    },
    {
      id: 16,
      week: 16,
      title: "RECURRENT NEURAL NETWORKS",
      subtitle: "RNN & LSTM Deep Dive",
      liveSessions: 3,
      assignments: 2,
      category: "neural-networks",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "RNN - Complete Mathematics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🧮",
          title: "LSTM - Complete Mathematics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "⚡",
          title: "Practical Example - RNN & LSTM Implementation",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Time Series Analysis Projects",
          locked: true,
        },
      ],
    },
    {
      id: 17,
      week: 17,
      title: "NATURAL LANGUAGE PROCESSING",
      subtitle: "NLP Fundamentals",
      liveSessions: 3,
      assignments: 2,
      category: "nlp",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "📝",
          title:
            "Introduction to NLP - Tokenization & Text Cleaning Using Regex",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📊",
          title: "Bag of Words, TF-IDF - Implementation",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "NLP Project Implementation",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Text Processing & Analysis Project",
          locked: true,
        },
      ],
    },

    // Advanced NLP (2 Weeks) - Weeks 18-19
    {
      id: 18,
      week: 18,
      title: "WORD EMBEDDINGS & LSTM NLP",
      subtitle: "Word2Vec & Text Classification",
      liveSessions: 3,
      assignments: 2,
      category: "nlp",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔤",
          title: "Word2Vec - Mathematics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🧠",
          title: "RNN & LSTM for Word Embedding Implementation",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "📚",
          title: "LSTM Project for Text Classification",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Text Classification & Similarity Project",
          locked: true,
        },
      ],
    },

    // Transformer Models (2 Weeks) - Weeks 19-20
    {
      id: 19,
      week: 19,
      title: "TRANSFORMER MODELS",
      subtitle: "Self-Attention & Architecture",
      liveSessions: 3,
      assignments: 2,
      category: "transformers",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🎯",
          title: "Self-Attention Mechanism - Complete Mathematics",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔧",
          title: "Transformer Encoder",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🏗️",
          title: "Transformer Decoder Architecture",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Transformer Implementation Project",
          locked: true,
        },
      ],
    },
    {
      id: 20,
      week: 20,
      title: "GPT & LARGE LANGUAGE MODELS",
      subtitle: "LLMs & Prompt Engineering",
      liveSessions: 3,
      assignments: 2,
      category: "transformers",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🤖",
          title: "Introduction to GPT & Famous LLMs",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "⚡",
          title: "OpenAI API - Prompt Engineering",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "💬",
          title: "Flask Chatbot for Specific Q&A",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Custom Chatbot Development Project",
          locked: true,
        },
      ],
    },

    // RAG & LangChain (1 Week) - Week 21
    {
      id: 21,
      week: 21,
      title: "RAG & LANGCHAIN",
      subtitle: "Retrieval-Augmented Generation",
      liveSessions: 3,
      assignments: 2,
      category: "rag-langchain",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🔍",
          title: "Introduction to RAG (Retrieval-Augmented Generation)",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "⛓️",
          title: "Understanding LangChain",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🤖",
          title: "Agent Creation - Social Media Agent",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Functional Chatbot with RAG",
          locked: true,
        },
      ],
    },

    // Agentic & Multi-Agent Systems (1 Week) - Week 22
    {
      id: 22,
      week: 22,
      title: "AGENTIC & MULTI-AGENT SYSTEMS",
      subtitle: "Advanced AI Agents",
      liveSessions: 3,
      assignments: 2,
      category: "agentic-systems",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🎬",
          title: "Agentic System - Movie Writer",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "👥",
          title: "Multi-Agent Practical System",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🔄",
          title: "Buffer/Revision Session",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Multi-Agent System Project",
          locked: true,
        },
      ],
    },

    // Project Week - Week 23
    {
      id: 23,
      week: 23,
      title: "MAJOR PROJECT WEEK",
      subtitle: "Capstone Project Development",
      liveSessions: 3,
      assignments: 2,
      category: "project",
      lessons: [
        {
          type: "PROJECT",
          icon: "🏗️",
          title: "Major Project Planning & Setup",
          locked: true,
        },
        {
          type: "PROJECT",
          icon: "⚙️",
          title: "Major Project Development",
          locked: true,
        },
        {
          type: "PROJECT",
          icon: "🎯",
          title: "Major Project Implementation & Testing",
          locked: true,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Complete Capstone Project",
          locked: true,
        },
      ],
    },

    // Final Week - Week 24
    {
      id: 24,
      week: 24,
      title: "FINAL REVIEW & PRESENTATIONS",
      subtitle: "Course Completion",
      liveSessions: 3,
      assignments: 2,
      category: "final",
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "📋",
          title: "Final Review & Feedback Session",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎤",
          title: "Project Presentations",
          locked: true,
        },
        {
          type: "LIVE LESSON",
          icon: "🎓",
          title: "Course Closure & Certification",
          locked: true,
        },
        {
          type: "DOUBT SESSION",
          icon: "❓",
          title: "Final Q&A and Career Guidance",
          locked: true,
        },
      ],
    },
  ];

  // Course filtering logic
  const getFilteredModules = () => {
    if (!courseData)
      return allModuleData.slice(0, showAllWeeks ? allModuleData.length : 4);

    const courseSlug = courseData.slug;
    let filteredModules = [];

    switch (courseSlug) {
      case "python-data-engineering-bootcamp":
        filteredModules = allModuleData.filter(
          (module) =>
            module.category === "python" ||
            module.category === "data-engineering"
        );
        break;

      case "sql-data-analysis":
        filteredModules = allModuleData.filter(
          (module) => module.category === "sql"
        );
        break;

      case "ml-deep-learning-sprint":
        filteredModules = allModuleData.filter(
          (module) =>
            module.category === "machine-learning" ||
            module.category === "neural-networks"
        );
        break;

      case "data-engineering-analytics":
        filteredModules = allModuleData.filter(
          (module) =>
            module.category === "python" ||
            module.category === "data-engineering" ||
            module.category === "sql" ||
            module.category === "machine-learning"
        );
        break;

      case "advanced-ai-agentic-systems":
      case "gen-ai-professional":
      default:
        filteredModules = allModuleData;
        break;
    }

    return showAllWeeks ? filteredModules : filteredModules.slice(0, 4);
  };

  const moduleData = getFilteredModules();
  const totalModules = courseData
    ? courseData.slug === "python-data-engineering-bootcamp"
      ? 6
      : courseData.slug === "sql-data-analysis"
      ? 3
      : courseData.slug === "ml-deep-learning-sprint"
      ? 8
      : courseData.slug === "data-engineering-analytics"
      ? 14
      : 24
    : 24;

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="course-enrollment">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {courseData?.title || "Master Deep Learning & AI in"} <br />
              <span className="gradient-text">{totalModules} Weeks</span>
            </h1>
           
            <br>
            </br>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{totalModules}</span>
                <span className="stat-label">Weeks</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalModules * 3}</span>
                <span className="stat-label">Live Sessions</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalModules * 2}</span>
                <span className="stat-label">Inikola Classes</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalModules * 2}+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
          <div className="enrollment-card">
            <div className="price-section">
              <div className="completion-rate">
                <span className="percentage">95%</span>
                <span className="completion-text">Student Success Rate</span>
              </div>
              <div className="course-subtitle">Proven Learning System</div>
              <div className="highlight-badge">STRUCTURED CURRICULUM</div>
            </div>

            <div className="course-features">
              <div className="feature">
                <span className="feature-icon">📅</span>
                <span>Batch Starts: August 12, 2025</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⏱️</span>
                <span>Duration: {courseData?.duration || "24 Weeks"}</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎓</span>
                <span>Industry Expert Mentorship</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💼</span>
                <span>Portfolio Projects</span>
              </div>
            </div>

            <button className="enroll-btn" onClick={handleEnrollClick}>
              <span>Enroll Now</span>
              <span className="btn-icon">→</span>
            </button>

            <div className="guarantee">
              <span className="guarantee-icon">🛡️</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="curriculum-section">
        <div className="curriculum-container">
          <div className="curriculum-header">
            <h2 className="section-title">
              Curriculum Overview{" "}
              <span className="gradient-text">
                ({totalModules} Weeks Program)
              </span>
            </h2>
            <p className="section-subtitle">
              Project-Focused Learning with hands-on implementation
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>

            {moduleData.map((module) => (
              <div key={module.id} className="module-container">
                <div className="week-indicator">
                  <div className="week-number">WEEK {module.week}</div>
                  <div className="week-dot"></div>
                </div>

                <div className="module-card">
                  <div
                    className="module-header"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="module-icon">
                      <div className="icon-circle">
                        {module.category === "python"
                          ? "🐍"
                          : module.category === "data-engineering"
                          ? "⚙️"
                          : module.category === "sql"
                          ? "🗄️"
                          : module.category === "machine-learning"
                          ? "🧠"
                          : module.category === "neural-networks"
                          ? "🤖"
                          : module.category === "nlp"
                          ? "📝"
                          : module.category === "transformers"
                          ? "🔄"
                          : module.category === "rag-langchain"
                          ? "⛓️"
                          : module.category === "agentic-systems"
                          ? "👥"
                          : module.category === "project"
                          ? "🏗️"
                          : "🎓"}
                      </div>
                    </div>

                    <div className="module-info">
                      <div className="module-label">MODULE {module.week}</div>
                      <div className="module-title-section">
                        <h3 className="module-title">{module.title}</h3>
                        <h4 className="module-subtitle">{module.subtitle}</h4>
                      </div>
                    </div>

                    <div className="module-stats">
                      {module.liveSessions && (
                        <div className="stat-chip live">
                          <span className="stat-dot"></span>
                          <span>{module.liveSessions} LIVE SESSIONS</span>
                        </div>
                      )}
                      {module.assignments && (
                        <div className="stat-chip assignment">
                          <span className="stat-dot"></span>
                          <span>{module.assignments} ASSIGNMENTS</span>
                        </div>
                      )}
                      <div className="expand-icon">
                        {expandedModule === module.id ? "⌄" : "⌃"}
                      </div>
                    </div>
                  </div>

                  {expandedModule === module.id && (
                    <div className="module-content">
                      {module.lessons.map((lesson, index) => (
                        <div key={index} className="lesson-item">
                          <div className="lesson-icon">
                            <span>{lesson.icon}</span>
                          </div>
                          <div className="lesson-info">
                            <div className="lesson-type">{lesson.type}</div>
                            <div className="lesson-title">{lesson.title}</div>
                          </div>
                          <div className="lesson-status">
                            {lesson.locked ? (
                              <div className="lock-icon">🔒</div>
                            ) : (
                              <div className="unlock-icon">✓</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Show More/Less Button */}
            {totalModules > 4 && (
              <div className="show-more-container">
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllWeeks(!showAllWeeks)}
                >
                  {showAllWeeks ? (
                    <>
                      <span>Show Less</span>
                      <span className="btn-icon">↑</span>
                    </>
                  ) : (
                    <>
                      <span>Show All {totalModules} Weeks</span>
                      <span className="btn-icon">↓</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="mentor-section">
        <div className="mentor-container">
          <h2 className="section-title">
            Meet Your <span className="gradient-text"> Mentor</span>
          </h2>

          <div className="mentor-card">
            <div className="mentor-avatar">
              <img src="/amansir1.png" alt="Aman" />
              <div className="mentor-badge">
                <span>⭐</span>
              </div>
            </div>

            <div className="mentor-info">
              <h3 className="mentor-name">Aman Sir</h3>
              <p className="mentor-title">Senior AI Engineer</p>
              <div className="mentor-stats">
                <div className="mentor-stat">
                  <span className="stat-icon">📈</span>
                  <span>5+ years in AI, LLMs, NLP & GenAI</span>
                </div>
                <div className="mentor-stat">
                  <span className="stat-icon">🎤</span>
                  <span>Guest Speaker at NeurIPS & CVPR</span>
                </div>
              </div>
              <blockquote className="mentor-quote">
                "Learn with logic. Build with intuition. That's the INikola
                way."
              </blockquote>
              <button className="linkedin-btn">
                <span className="linkedin-icon">💼</span>
                <span>View LinkedIn Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <h2 className="section-title">
            What You <span className="gradient-text">Get</span>
          </h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💡</div>
              <h3>Deep AI Understanding</h3>
              <p>Math + Code implementation for complete mastery</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Live Mentor Sessions</h3>
              <p>Direct access via INikola platform</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>Real Projects</h3>
              <p>NLP, LSTM, GPT Bots, Langchain implementations</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📜</div>
              <h3>Certificate + Portfolio</h3>
              <p>Industry-recognized completion certificate</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Job-Ready Projects</h3>
              <p>Resume boosters and portfolio showcase</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Career Support</h3>
              <p>Interview prep and job placement assistance</p>
            </div>
          </div>
        </div>
      </section>
      <JoinCourseModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </div>
  );
};

export default Enroll;
