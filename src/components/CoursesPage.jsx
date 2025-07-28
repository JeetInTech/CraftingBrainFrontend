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

  // Course data with unique slugs for routing
  const courses = [
    {
      id: 1,
      slug: "Enroll",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      category: "UI/UX DESIGN",
      title: "User Experience Design Fundamentals",
      instructor: "Sarah Mitchell",
      sessions: "16 Sessions",
      price: "₹19.00",
      originalPrice: "₹25.00",
      featured: false,
    },
    {
      id: 2,
      slug: "graphic-design-intro",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      category: "GRAPHIC DESIGN",
      title: "Introduction to Graphic Design",
      instructor: "Liam Garcia",
      sessions: "12 Sessions",
      price: "₹30.00",
      originalPrice: "₹35.00",
      featured: true,
    },
    {
      id: 3,
      slug: "frontend-bootcamp",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
      category: "WEB DEVELOPMENT",
      title: "Frontend Web Development Bootcamp",
      instructor: "Emma Wilson",
      sessions: "20 Sessions",
      price: "₹30.00",
      originalPrice: "₹45.00",
      featured: false,
    },
    {
      id: 4,
      slug: "react-native-mobile",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      category: "MOBILE DEV",
      title: "React Native Mobile Development",
      instructor: "John Doe",
      sessions: "18 Sessions",
      price: "₹35.00",
      originalPrice: "₹50.00",
      featured: false,
    },
    {
      id: 5,
      slug: "python-data-analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      category: "DATA SCIENCE",
      title: "Data Analytics with Python",
      instructor: "Jane Smith",
      sessions: "15 Sessions",
      price: "₹40.00",
      originalPrice: "₹55.00",
      featured: false,
    },
    {
      id: 6,
      slug: "social-media-marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "DIGITAL MARKETING",
      title: "Social Media Marketing Mastery",
      instructor: "Mike Johnson",
      sessions: "14 Sessions",
      price: "₹25.00",
      originalPrice: "₹35.00",
      featured: false,
    },
  ];

  // Categories data
  const categories = [
    {
      title: "UI/UX Design",
      description: "Master the principles of user-centered design...",
      number: "1.",
      featured: false,
      icon: "🎨",
    },
    {
      title: "Web Development",
      description: "Build responsive websites and modern web...",
      number: "2.",
      featured: true,
      icon: "💻",
    },
    {
      title: "Mobile Development",
      description: "Learn how to create stunning mobile...",
      number: "3.",
      featured: false,
      icon: "📱",
    },
    {
      title: "Digital Marketing",
      description: "Grow businesses with effective marketing...",
      number: "4.",
      featured: false,
      icon: "📈",
    },
    {
      title: "Data & Artificial Intelligence",
      description: "Understand data analytics, machine learning, and AI...",
      number: "5.",
      featured: false,
      icon: "🤖",
    },
    {
      title: "Creative & Multimedia",
      description: "Unleash your creativity with courses in graphic...",
      number: "6.",
      featured: false,
      icon: "🎬",
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
        "We offer courses in web development, mobile development, UI/UX design, data science, digital marketing, and more.",
    },
    {
      question: "Are the courses beginner-friendly?",
      answer:
        "Yes! We have courses for all levels, from complete beginners to advanced professionals.",
    },
    {
      question: "Can I control my smart home when I'm away?",
      answer:
        "This seems to be a misplaced question. Please contact support for smart home related queries.",
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
        role: "Software Engineer",
        rating: 5,
        text: '"I never thought online learning could feel this personal. Relearn helped me switch careers with confidence!"',
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Liam Garcia",
        role: "UI/UX Designer",
        rating: 5,
        text: "\"Relearn made it easy for me to balance work and study. I can't believe how much I've grown!\"",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Emma Hanasui",
        role: "Data Analyst",
        rating: 5,
        text: '"The interactive projects in Relearn were a game changer. I felt like I was in a real classroom."',
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      },
    ],
    [
      {
        name: "James Carter",
        role: "Digital Marketing Specialist",
        rating: 5,
        text: '"Thanks to Relearn, I landed my dream job within 3 months of starting! The support was incredible!"',
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Olivia Brown",
        role: "UI/UX Designer",
        rating: 5,
        text: '"The interactive projects in Relearn were a game changer. I felt like I was in a real classroom."',
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        featured: true,
      },
      {
        name: "Noah Smith",
        role: "Software Engineer",
        rating: 5,
        text: '"I never thought online learning could feel this personal. Relearn helped me switch careers with confidence!"',
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      },
    ],
    [
      {
        name: "Shopia Thomson",
        role: "Junior Front-End Developer",
        rating: 5,
        text: '"I never thought online learning could feel this personal. Relearn helped me switch careers with confidence!"',
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Liam Garcia",
        role: "UI/UX Designer",
        rating: 5,
        text: '"I never thought online learning could feel this personal. Relearn helped me switch careers with confidence!"',
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      },
      {
        name: "Hanna Simpson",
        role: "Data Analyst",
        rating: 5,
        text: '"I never thought online learning could feel this personal. Relearn helped me switch careers with confidence!"',
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
            
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=400&fit=crop&crop=face"
              alt="Happy learner"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">📚</span>
            OUR COURSES
          </div>
          <h2 className="section-title">
            Explore our Best <span className="text-purple">Courses</span>
          </h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">
              Search 🔍
            </button>
          </div>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`course-card ₹{course.featured ? "featured" : ""}`}
            >
              <div className="course-image" style={{ position: "relative" }}>
                <img src={course.image} alt={course.title} />
                <div className="course-category">{course.category}</div>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-instructor">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&crop=face"
                    alt={course.instructor}
                  />
                  <span>{course.instructor}</span>
                  <span className="sessions">{course.sessions}</span>
                </div>
                <div className="course-footer">
                  <div className="course-price">
                    <span className="current-price">{course.price}</span>
                    <span className="original-price">
                      {course.originalPrice}
                    </span>
                  </div>
                  {/* Updated Join Course Button with Navigation */}
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
              Browse top-quality courses in various categories tailored to your
              goals.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="step-number">03</span>
              <div className="icon">⏰</div>
            </div>
            <h3>Learn at Your Own Pace</h3>
            <p>
              Access lessons anytime, anywhere. Enjoy flexible learning with
              videos, quizzes, and assignments.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="step-number">04</span>
              <div className="icon">🏆</div>
            </div>
            <h3>Earn Your Certificate</h3>
            <p>
              Complete the course and receive an official digital certificate to
              boost your resume and career.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-header">
          <h2 className="section-title">
            Choose Your Favourite Course from Top{" "}
            <span className="text-purple">Categories</span>
          </h2>
          <p className="section-description">
            Discover a variety of in-demand learning categories designed to
            elevate your skills and boost your career.
          </p>
          <button className="browse-btn">Browse All Categories →</button>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-card ₹{category.featured ? "featured" : ""}`}
            >
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <button className="show-more-btn">Show More →</button>
              </div>
              <div className="category-icon">
                <div className="icon-circle">
                  <span className="category-icon-symbol">{category.icon}</span>
                </div>
              </div>
              <div className="category-number">{category.number}</div>
            </div>
          ))}
        </div>

        <div className="categories-nav">
          <button className="nav-arrow">←</button>
          <button className="nav-arrow">→</button>
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
                className={`faq-item ₹{openFaq === faq.question ? "open" : ""}`}
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
                className={`testimonial-card ₹{
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
