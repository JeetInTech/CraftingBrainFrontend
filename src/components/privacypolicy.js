// src/pages/PrivacyPolicy.js
import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="last-updated">Last updated: January 2025</p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="privacy-content">
        <div className="container">
          <div className="content-wrapper">
            
            <div className="privacy-section">
              <h2>Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                enroll in our courses, or contact us for support. This may include:
              </p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Educational background and professional experience</li>
                <li>Payment information for course enrollment</li>
                <li>Course progress and performance data</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our educational services</li>
                <li>Process payments and manage your account</li>
                <li>Send you course updates and important notifications</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal requirements</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="privacy-section">
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div className="privacy-section">
              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for children under 18. We do not knowingly collect 
                personal information from children under 18 without parental consent.
              </p>
            </div>

            <div className="privacy-section">
              <h2>Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by posting the new policy on our website and updating the 
                "Last updated" date.
              </p>
            </div>

            <div className="privacy-section">
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our practices, 
                please contact us at:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@craftingbrain.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;