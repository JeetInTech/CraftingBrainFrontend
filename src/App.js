// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.js";
import { useDynamicCSS } from "./hooks/DynamicCSSLoader";

// Import components
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";
import CoursesPage from "./components/CoursesPage";
import Enroll from "./components/enroll";

// Import pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Course from "./pages/Courses";
// Add this import
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LearningDashboard from "./pages/LearningDashboard";
import ScanAndPayPage from "./pages/payment";
import RecordingsV2 from "./pages/RecordingV2";
import Workshop from "./pages/workshop";
import PrivacyPolicy from "./components/privacypolicy";
import CourseOverview from "./pages/CourseOverview.js";

// Wrapper component for pages that need specific CSS
const ThemedPage = ({ cssKey, children }) => {
  useDynamicCSS(cssKey);
  return <>{children}</>;
};

// Main App Content Component
const AppContent = () => {
  return (
    <Router>
      <div className="App">
        {/* Scroll to top functionality */}
        <ScrollToTop />

        {/* Theme Toggle Button - Fixed position, appears on all pages */}
        <ThemeToggle />

        {/* Header with dynamic theme CSS */}
        <ThemedPage cssKey="header">
          <Header />
        </ThemedPage>

        {/* Main Routes with themed CSS loading */}
        <Routes>
          {/* Home Page - loads hero CSS for landing section */}
          <Route
            path="/"
            element={
              <ThemedPage cssKey="hero">
                <Home key="home" />
              </ThemedPage>
            }
          />

          {/* About Page - loads about-specific CSS */}
          <Route
            path="/about"
            element={
              <ThemedPage cssKey="about">
                <About key="about" />
              </ThemedPage>
            }
          />

          {/* Contact Page - loads contact form CSS */}
          <Route
            path="/contact"
            element={
              <ThemedPage cssKey="contact">
                <Contact key="contact" />
              </ThemedPage>
            }
          />

          {/* Courses Page - loads course cards CSS */}
          <Route
            path="/courses"
            element={
              <ThemedPage cssKey="cards">
                <Course key="courses" />
              </ThemedPage>
            }
          />

          {/* CoursesPage - Add this new route */}
          <Route
            path="/coursespage"
            element={<CoursesPage key="coursespage" />}
          />
          <Route
            path="/enroll/:slug"
            element={<Enroll key="enroll-course" />}
          />
          {/* Register Page - can use contact CSS for forms */}
          <Route
            path="/Register"
            element={
              <ThemedPage cssKey="contact">
                <RegisterPage />
              </ThemedPage>
            }
          />

          {/* Learning Dashboard - use course CSS */}
          <Route
            path="/dashboard"
            element={
              <ThemedPage cssKey="course">
                <LearningDashboard />
              </ThemedPage>
            }
          />

          {/* Payment Page - use contact CSS for forms */}
          <Route
            path="/payment"
            element={
              <ThemedPage cssKey="contact">
                <ScanAndPayPage />
              </ThemedPage>
            }
          />

          {/* Recordings Page - use course CSS */}
          <Route
            path="/recordings"
            element={
              <ThemedPage cssKey="course">
                <RecordingsV2 />
              </ThemedPage>
            }
          />

          {/* Workshop Page - use cards CSS for layout */}
          <Route
            path="/workshop"
            element={
              <ThemedPage cssKey="workshop">
                <Workshop />
              </ThemedPage>
            }
          />

          {/* Privacy Policy - use about CSS for content pages */}
          <Route
            path="/privacypolicy"
            element={
              <ThemedPage cssKey="about">
                <PrivacyPolicy />
              </ThemedPage>
            }
          />

          <Route
            path="/courseEnroll"
            element={
              <ThemedPage cssKey="course">
                <CourseOverview />
              </ThemedPage>
            }
          />
        </Routes>

        {/* Footer with dynamic theme CSS - if you have a footer component */}
        {/* Uncomment when you add Footer component
        <ThemedPage cssKey="footer">
          <Footer />
        </ThemedPage>
        */}
      </div>
    </Router>
  );
};

// Main App Component with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
