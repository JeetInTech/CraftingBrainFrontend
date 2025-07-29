// src/pages/CoursesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./CoursesPage.css";
import JoinCourseModal from "../components/JoinCourseModal"; 

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState("What is Relearn?");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate(); // Add this hook
  const [selectedCourse, setSelectedCourse] = useState(null);

    const handleJoinCourse = (course) => {
      setSelectedCourse(course);
    };

  // Course data with unique slugs for routing - Updated from Excel file
  const courses = [
    // Main Courses
    {
      id: 1,
      slug: "advanced-ai-agentic-systems",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      category: "ARTIFICIAL INTELLIGENCE",
      title: "Advanced Artificial Intelligence & Agentic Systems Program",
      duration: "(12-14) weeks / (3-3.5) months",
      details: "ML-1, ML2(deep learning), NLP, transformer models, LLM models, agentic AI",
      value: "₹45,000",
      stipend: "₹5,000",
      certificate: true,
      placement: true,
      featured: true,
      isMainCourse: true,
    },
    {
      id: 2,
      slug: "data-engineering-analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      category: "DATA ENGINEERING",
      title: "Advanced Data Engineering & Analytics Program",
      duration: "(15-16) weeks / (3.5-4) months",
      details: "Python, data engineering, cloud, SQL, advanced data analysis, ML-1, Tableau",
      value: "₹39,000",
      stipend: "₹3,000",
      certificate: true,
      placement: true,
      placementFee: "₹5,000",
      featured: false,
      isMainCourse: true,
    },
    {
      id: 3,
      slug: "gen-ai-professional",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
      category: "GEN-AI PROFESSIONAL",
      title: "Gen-AI Professional Course - Complete Package",
      duration: "(24-25) weeks / (6-6.5) months",
      details: "Comprehensive program combining AI, ML, Data Engineering - All together",
      value: "₹79,000",
      stipend: "₹10,000",
      certificate: true,
      placement: true,
      featured: true,
      isMainCourse: true,
      allInclusive: true,
    },
    // Sub Courses (Crash Courses)
    {
      id: 4,
      slug: "python-data-engineering-bootcamp",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      category: "BOOTCAMP",
      title: "Python Programming & Data Engineering Bootcamp",
      duration: "(6-7) weeks / (1.5-2) months",
      details: "Python programming fundamentals + Data engineering principles",
      value: "₹16,499",
      stipend: "₹2,000",
      certificate: true,
      placement: false,
      featured: false,
      isMainCourse: false,
    },
    {
      id: 5,
      slug: "sql-data-analysis",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "DATA ANALYSIS",
      title: "SQL Mastery & Advanced Data Analysis",
      duration: "(4-5) weeks / (1-1.5) months",
      details: "SQL fundamentals to advanced + comprehensive data analysis techniques",
      value: "₹13,999",
      stipend: "₹1,500",
      certificate: true,
      placement: false,
      featured: false,
      isMainCourse: false,
    },
    {
      id: 6,
      slug: "ml-deep-learning-sprint",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      category: "MACHINE LEARNING",
      title: "Advanced Machine Learning & Deep Learning Sprint",
      duration: "(9-10) weeks / (2.5-3) months",
      details: "ML-1 fundamentals + ML-2 (deep learning) advanced concepts",
      value: "₹24,999",
      stipend: "₹3,500",
      certificate: true,
      placement: false,
      featured: false,
      isMainCourse: false,
    },
  ];

  // Categories data
  const categories = [
    {
      title: "Artificial Intelligence",
      description: "Master AI, ML, and cutting-edge agentic systems...",
      number: "1.",
      featured: false,
      icon: "🤖",
    },
    {
      title: "Data Engineering",
      description: "Build robust data pipelines and analytics...",
      number: "2.",
      featured: true,
      icon: "📊",
    },
    {
      title: "Gen-AI Professional",
      description: "Complete AI professional development...",
      number: "3.",
      featured: false,
      icon: "⚡",
    },
    {
      title: "Python Programming",
      description: "Master Python for data science and engineering...",
      number: "4.",
      featured: false,
      icon: "🐍",
    },
    {
      title: "SQL & Data Analysis",
      description: "Advanced database management and analysis...",
      number: "5.",
      featured: false,
      icon: "📈",
    },
    {
      title: "Machine Learning",
      description: "Deep learning and advanced ML algorithms...",
      number: "6.",
      featured: false,
      icon: "🧠",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is Relearn?",
      answer:
        "Relearn is an online learning platform that lets you take courses anytime, anywhere. Learn new skills, level up your career, or explore new interests on your schedule.",
    },
    {
      question: "Who can use Relearn?",
      answer:
        "Anyone looking to learn new skills or advance their career can use Relearn. Our courses are designed for all skill levels.",
    },
    {
      question: "What types of courses are available?",
      answer:
        "We offer courses in AI, machine learning, data engineering, Python programming, SQL, and comprehensive Gen-AI professional programs.",
    },
    {
      question: "Are the courses beginner-friendly?",
      answer:
        "Yes! We have courses for all levels, from complete beginners to advanced professionals.",
    },
    {
      question: "Do you provide certificates and placement assistance?",
      answer:
        "Yes! All courses include certificates upon completion. Main courses also include guaranteed placement assistance and performance-based stipends.",
    },
    {
      question: "Can I access Relearn from my phone or tablet?",
      answer:
        "Yes! Relearn is fully responsive and works on all devices including phones, tablets, and computers.",
    },
    {
      question: "Do I need to download anything?",
      answer:
        "No downloads required! Access all courses directly through your web browser.",
    },
  ];

  // Testimonials data
  const testimonials = [
    [
      {
        name: "Olivia Brown",
        role: "AI Engineer",
        rating: 5,
        text: '"The AI program helped me transition into cutting-edge technology. The stipend was a great bonus!"',
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Liam Garcia",
        role: "Data Engineer",
        rating: 5,
        text: "\"The data engineering course was comprehensive and the placement assistance was excellent!\"",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Emma Hanasui",
        role: "ML Specialist",
        rating: 5,
        text: '"The machine learning sprint gave me exactly what I needed to advance my career."',
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      },
    ],
    [
      {
        name: "James Carter",
        role: "Gen-AI Developer",
        rating: 5,
        text: '"The comprehensive Gen-AI program was worth every penny. Got placed within 2 months!"',
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Olivia Brown",
        role: "Python Developer",
        rating: 5,
        text: '"The Python bootcamp was intensive and practical. Perfect for career switching!"',
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        featured: true,
      },
      {
        name: "Noah Smith",
        role: "Data Analyst",
        rating: 5,
        text: '"SQL mastery course transformed my data analysis skills completely!"',
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      },
    ],
    [
      {
        name: "Sophia Thomson",
        role: "AI Research Associate",
        rating: 5,
        text: '"The agentic AI systems module was groundbreaking. Highly recommend!"',
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Michael Chen",
        role: "Senior Data Engineer",
        rating: 5,
        text: '"Best investment in my career. The hands-on projects were amazing!"',
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Anna Rodriguez",
        role: "ML Engineer",
        rating: 5,
        text: '"From theory to practice, this program covers everything you need!"',
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
      },
    ],
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const toggleFaq = (question) => {
    setOpenFaq(openFaq === question ? "" : question);
  };

  const nextTestimonials = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonials = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Add function to handle course enrollment
  // const handleJoinCourse = (course) => {
  //   // Option 1: Navigate to individual course page
  //   // navigate(`/course/₹{course.slug}`);
  //   navigate(`/enroll/₹{course.slug}`, { state: { course } });
  //   // Option 2: Navigate to enrollment page with course data
  //   // navigate(`/enroll/₹{course.slug}`, { state: { course } });

  //   // Option 3: Navigate to a general enrollment page
  //   // navigate('/enrollment');
  // };

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Relearn empowers your growth—{" "}
              <span className="text-purple">anytime, anywhere.</span>
            </h1>
            
            {/* Key Features */}
            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <div className="feature-text">
                  <h3>Experience certificate from INIKOLA</h3>
                  <p>Industry-recognized certification</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <div className="feature-text">
                  <h3><strong>Stipend up to ₹10k every month</strong></h3>
                  <p>Performance-based rewards</p>
                </div>  
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div className="feature-text">
                  <h3>Guaranteed Placements</h3>
                  <p>100% placement assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Courses Section */}
      <section className="courses-section">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">🎯</span>
            MAIN COURSES
          </div>
          <h2 className="section-title">
            Professional <span className="text-purple">Programs</span>
          </h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {/* <button onClick={handleSearch} className="search-btn">
              Search 🔍
            </button> */}
          </div>
        </div>

        <div className="courses-grid">
          {mainCourses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${course.featured ? "featured" : ""}`}
            >
              <div className="course-image" style={{ position: "relative" }}>
                <img src={course.image} alt={course.title} />
                <div className="course-category">{course.category}</div>
                {course.allInclusive && (
                  <div className="all-inclusive-badge">ALL INCLUSIVE</div>
                )}
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-duration">
                  <span className="duration">{course.duration}</span>
                </div>
                <div className="course-details">
                  <p>{course.details}</p>
                </div>
                
                <div className="course-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">🎓</span>
                    <span>Certificate</span>
                  </div>
                
                  <div className="benefit-item">
                    <span className="benefit-icon">🎯</span>
                    <span>Placement</span>
                  </div>
                </div>

                <div className="course-footer">
                  <div className="stipend-highlight">
                    <span className="stipend-label">Earn Stipend:</span>
                    <span className="stipend-amount">{course.stipend}</span>
                  </div>
                  <button
                    className={`join-btn ${course.featured ? "featured" : ""}`}
                    onClick={() => handleJoinCourse(course)}
                  >
                    Course Details → 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sub Courses Section */}
      <section className="courses-section sub-courses">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">⚡</span>
            CRASH COURSES
          </div>
          <h2 className="section-title">
            Quick <span className="text-purple">Skill Boosters</span>
          </h2>
        </div>

        <div className="courses-grid">
          {subCourses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${course.featured ? "featured" : ""}`}
            >
              <div className="course-image" style={{ position: "relative" }}>
                <img src={course.image} alt={course.title} />
                <div className="course-category">{course.category}</div>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-duration">
                  <span className="duration">{course.duration}</span>
                </div>
                <div className="course-details">
                  <p>{course.details}</p>
                </div>
                
                <div className="course-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">🎓</span>
                    <span>Certificate</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">💰</span>
                    <span><strong>Stipend: {course.stipend}</strong></span>
                  </div>
                </div>

                <div className="course-footer">
                  <div className="stipend-highlight">
                    <span className="stipend-label">Earn Stipend:</span>
                    <span className="stipend-amount">{course.stipend}</span>
                  </div>
                  <button
                  className={`join-btn ${course.featured ? "featured" : ""}`}
                  onClick={() => handleJoinCourse(course)}
                >
                  Join Course
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">
          Easy <span className="text-purple">Courses</span> to Smarter Learning
        </h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon active">
              <span className="step-number">01</span>
              <div className="icon">📋</div>
            </div>
            <h3>Sign Up for Free</h3>
            <p>
              Create your account in seconds - no hidden fees or setup required.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="step-number">02</span>
              <div className="icon">🎯</div>
            </div>
            <h3>Pick Your Course</h3>
            <p>
              Choose from main professional programs or quick crash courses tailored to your goals.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="step-number">03</span>
              <div className="icon">⏰</div>
            </div>
            <h3>Learn & Earn</h3>
            <p>
              Study at your pace, complete projects, and earn performance-based stipends up to ₹10K.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="step-number">04</span>
              <div className="icon">🏆</div>
            </div>
            <h3>Get Certified & Placed</h3>
            <p>
              Receive your certificate and benefit from our guaranteed placement assistance program.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-left">
            <div className="section-badge">
              <span className="badge-icon">❓</span>
              NEED HELP
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="text-purple">Questions</span>
            </h2>
            <p className="section-description">
              We're here to make learning easy. Explore our FAQs to quickly find
              the information you need about features, courses, access, and
              more.
            </p>
            <div className="help-card">
              <h3>Still have a question?</h3>
              <p>
                We're here to help you. If you have any questions or need more
                information, feel free to reach out!
              </p>
              <button className="ask-question-btn">Ask a Question →</button>
            </div>
          </div>

          <div className="faq-right">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === faq.question ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(faq.question)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {openFaq === faq.question ? "−" : "+"}
                  </span>
                </button>
                {openFaq === faq.question && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-badge">
          <span className="badge-icon">💬</span>
          TESTIMONIALS
        </div>
        <h2 className="section-title">
          What Our Learners <span className="text-purple">Are Saying</span>
        </h2>

        <div className="testimonials-container">
          <div className="testimonials-grid">
            {testimonials[currentTestimonial].map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${
                  testimonial.featured ? "featured" : ""
                }`}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="quote-icon">💬</div>
              </div>
            ))}
          </div>

          <div className="testimonials-nav">
            <button onClick={prevTestimonials} className="nav-arrow">
              ←
            </button>
            <button onClick={nextTestimonials} className="nav-arrow">
              →
            </button>
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

export default CoursesPage;