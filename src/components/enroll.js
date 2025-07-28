// src/components/Enroll.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Enroll.css";

const Enroll = () => {
  const [expandedModule, setExpandedModule] = useState(1);
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate("/payment");
  };

  const moduleData = [
    {
      id: 1,
      week: 1,
      title: "DIVE STRAIGHT IN THE DEEP END",
      subtitle: "Proprietary Models & Diffusion",
      liveSessions: 3,
      assignments: 1,
      expanded: true,
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "📚",
          title: "History of GenAI, How to Research and Intro to Playground AI",
          locked: false,
        },
        {
          type: "LIVE LESSON",
          icon: "⚙️",
          title: "How Diffusion Models Work and Playground AI",
          locked: false,
        },
        {
          type: "ASSIGNMENT",
          icon: "💯",
          title: "Practice Set - 1",
          locked: false,
        },
        {
          type: "LIVE LESSON",
          icon: "💬",
          title: "Prompt Engineering for Various Outputs",
          locked: false,
        },
      ],
    },
    {
      id: 2,
      week: 2,
      title: "PROMPTS, PARAMETERS, SCRIPTS & MORE",
      subtitle: "Intro to Stable Diffusion",
      liveSessions: 1,
      videoLessons: 13,
      assignments: 1,
      expanded: false,
      lessons: [
        {
          type: "LIVE LESSON",
          icon: "🎨",
          title: "Advanced Prompt Engineering Techniques",
          locked: true,
        },
        {
          type: "VIDEO LESSON",
          icon: "📹",
          title: "Setting up Stable Diffusion Locally",
          locked: true,
        },
        {
          type: "VIDEO LESSON",
          icon: "📹",
          title: "Understanding Parameters and Settings",
          locked: true,
        },
      ],
    },
    {
      id: 3,
      week: 3,
      title: "ADVANCED TECHNIQUES",
      subtitle: "Fine-tuning and Custom Models",
      liveSessions: 2,
      videoLessons: 8,
      assignments: 2,
      expanded: false,
      lessons: [],
    },
  ];

  const toggleModule = (moduleId) => {};

  return (
    <div className="course-enrollment">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="course-badge">
              <span className="badge-icon">🤖</span>
              AI SPECIALIZATION
            </div>
            <h1 className="hero-title">
              Master Deep Learning & AI in{" "}
              <span className="gradient-text">12 Weeks</span>
            </h1>
            <p className="hero-subtitle">
              Learn from Top Mentors. Build Real-World AI Solutions.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10</span>
                <span className="stat-label">Weeks</span>
              </div>
              <div className="stat">
                <span className="stat-number">24</span>
                <span className="stat-label">Live Sessions</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
          <div className="enrollment-card">
            <div className="price-section">
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">35,000</span>
              </div>
              <div className="original-price">₹9,999</div>
              <div className="discount-badge">25% OFF</div>
            </div>

            <div className="course-features">
              <div className="feature">
                <span className="feature-icon">📅</span>
                <span>Batch Starts: August 12, 2025</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⏱️</span>
                <span>Duration: 10 Weeks</span>
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
              <span className="gradient-text">(Weeks 15–24)</span>
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
                        {module.id === 1 ? "🔥" : module.id === 2 ? "🎯" : "⚡"}
                      </div>
                    </div>

                    <div className="module-info">
                      <div className="module-label">MODULE {module.id}</div>
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
                      {module.videoLessons && (
                        <div className="stat-chip video">
                          <span className="stat-dot"></span>
                          <span>{module.videoLessons} VIDEO LESSONS</span>
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
    </div>
  );
};

export default Enroll;
