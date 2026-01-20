import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing__inner">
        <section className="hero">
          <div className="hero__text">
            <h1 className="hero__title">
              Learn modern skills with a clean, elegant platform.
            </h1>
            <p className="hero__subtitle">
              Browse curated courses, track your progress, and grow your career
              with structured learning paths.
            </p>

            <div className="hero__actions">
              <Link to="/courses" className="btn-hero btn-hero--primary">
                Browse courses
              </Link>
              <Link to="/signup" className="btn-hero btn-hero--ghost">
                Get started free
              </Link>
            </div>
          </div>

          <div className="hero__illustration">
            <div className="hero-badge hero-badge--one">Live sessions</div>
            <div className="hero-badge hero-badge--two">Project based</div>
            <div className="hero-badge hero-badge--three">Track progress</div>
          </div>
        </section>

        <section className="feature-strip">
          <div className="feature-strip__item">Verified instructors</div>
          <div className="feature-strip__item">Hands‑on projects</div>
          <div className="feature-strip__item">Responsive design</div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
