import React from "react";
import { useDynamicCSS } from "../hooks/DynamicCSSLoader";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/ScrollAnimation";
import "../styles/ScrollAnimations.css";

const AboutCraftingBrain = () => {
  useDynamicCSS("about");

  // Animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.3 });
  const missionAnimation = useScrollAnimation({ threshold: 0.3, delay: 200 });
  const partnershipAnimation = useScrollAnimation({
    threshold: 0.3,
    delay: 300,
  });
  const valuesAnimation = useScrollAnimation({ threshold: 0.3, delay: 400 });
  const teamTitleAnimation = useScrollAnimation({ threshold: 0.3, delay: 100 });
  const founderAnimation = useScrollAnimation({ threshold: 0.3, delay: 200 });
  const teamMembersAnimation = useStaggeredAnimation(3, {
    threshold: 0.2,
    staggerDelay: 200,
    rootMargin: "0px 0px -50px 0px",
  });

  const teamMembers = [
    {
      name: "Satya Sai Karthik Maradani",
      role: "Gen AI Data Scientist",
      image: "/karthik.jpg",
      description:
        "Specializes in Python, Data Analytics, AWS, Machine Learning, " +
        "and Deep Learning to craft AI-driven solutions",
      position: "bottom-left",
    },
    {
      name: "Maharaj",
      role: "Gen AI Data Scientist",
      image: "/maharaj.jpg",
      description:
        "Focuses on building intelligent, automation-first systems using " +
        "ML and DL, enhancing operational efficiency and driving innovation " +
        "across diverse industries.",
      position: "bottom-right",
    },
    {
      name: "Dr.jeet&Bilal",
      role: "Director of Education",
      image: "/avatar.png",
      description:
        "Ensures programs meet evolving industry needs while guiding students " +
        "towards academic excellence and professional readiness.",
      position: "bottom-center",
    },
  ];

  const founder = {
    name: "Aman Kasaudhan",
    role: "Founder & CEO",
    image: "/amansir1.png",
    description:
      "Visionary leader with over a decade of experience in AI and Data Science, " +
      "committed to transforming education through innovative technology.",
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero1-section">
        <div className="hero1-background">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
            alt="AI Background"
          />
        </div>
        <div
          ref={heroAnimation.elementRef}
          className={`hero1-content slide-up ${heroAnimation.animationClass}`}
        >
          <h1 className="hero1-title">About Crafting Brain</h1>
          <p className="hero1-subtitle">
            Empowering the next generation of AI and Data Science professionals
            through innovation, mentorship, and real-world experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div
            ref={missionAnimation.elementRef}
            className={`mission-content slide-right ${missionAnimation.animationClass}`}
          >
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Crafting Brain, we are dedicated to empowering aspiring data
                scientists with real-world skills through hands-on projects and
                expert mentorship. We focus on nurturing talent and bridging the
                gap between academic knowledge and industry requirements.
              </p>
              <p>
                Our comprehensive approach combines theoretical foundations with
                practical applications, ensuring our students are not just
                job-ready, but industry leaders of tomorrow.
              </p>
            </div>
            <div className="mission-image">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop"
                alt="Our Mission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="partnership-section">
        <div className="container">
          <div
            ref={partnershipAnimation.elementRef}
            className={`partnership-content slide-left ${partnershipAnimation.animationClass}`}
          >
            <div className="partnership-image">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Partnership with Inikola"
              />
            </div>
            <div className="partnership-text">
              <h2>Why Partner with Inikola?</h2>
              <p>
                Our partnership with Inikola allows us to provide an
                industry-relevant internship experience, offering insights into
                advanced data science practices, cutting-edge technology, and a
                dynamic learning environment.
              </p>
              <div className="partnership-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <span>Real industry exposure</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💼</span>
                  <span>100% placement guarantee</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💰</span>
                  <span>Guaranteed stipend from month 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div
            ref={valuesAnimation.elementRef}
            className={`values-content fade-in ${valuesAnimation.animationClass}`}
          >
            <div className="values-text">
              <h2>Our Core Values</h2>
              <div className="values-list">
                <div className="value-item">
                  <span className="value-icon">🎯</span>
                  <div>
                    <h4>Excellence</h4>
                    <p>
                      We strive for excellence in everything we do, from
                      curriculum design to student support.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <span className="value-icon">🤝</span>
                  <div>
                    <h4>Collaboration</h4>
                    <p>
                      We believe in the power of collaboration between students,
                      mentors, and industry partners.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <span className="value-icon">🔄</span>
                  <div>
                    <h4>Continuous Learning</h4>
                    <p>
                      We foster a culture of continuous learning and adaptation
                      to stay ahead of industry trends.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <span className="value-icon">💡</span>
                  <div>
                    <h4>Innovation</h4>
                    <p>
                      We embrace innovation and encourage creative
                      problem-solving in all our programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="values-image">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=600&fit=crop"
                alt="Our Values"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Semi-Circle Layout */}
      <section className="team-section">
        <div className="container">
          <div
            ref={teamTitleAnimation.elementRef}
            className={`section-title-animate ${teamTitleAnimation.animationClass}`}
          >
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-subtitle">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="team-layout">
            {/* Founder in Center */}
            <div
              ref={founderAnimation.elementRef}
              className={`founder-card scale-up ${founderAnimation.animationClass}`}
            >
              <div className="member-circle founder-circle">
                <img src={founder.image} alt={founder.name} />
              </div>
              <div className="member-info">
                <h3 className="member-name">{founder.name}</h3>
                <p className="member-description">{founder.description}</p>
              </div>
            </div>

            {/* Team Members in Horizontal Row */}
            <div
              ref={teamMembersAnimation.containerRef}
              className="team-members-row stagger-container"
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`team-member team-member-animate ${teamMembersAnimation.getItemAnimationClass(
                    index
                  )}`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="member-circle">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-description">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutCraftingBrain;
