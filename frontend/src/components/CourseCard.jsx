import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
import { useAuthContext } from "../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const CourseCard = ({ course }) => {
  const { user } = useAuthContext(); 
  const navigate = useNavigate();

  const handleCardClick = () => {
  navigate(`/courses/${course.slug}`);
};
  const handleEnroll = async (e) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    try {
      const res = await fetch(`${API_BASE}/courses/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          courseId: course._id 
        })
      });
      if (res.ok) alert('✅ Enrolled successfully!');
    }catch (err) {
      alert('❌ Enrollment failed');
    }
  };

  return (
    <div className="course-card" onClick={handleCardClick}>
      <div className="course-card__img-container">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="course-card__side-img"
          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/2997/2997406.png' }}
        />
      </div>
      <div className="course-card__content">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__desc">{course.description}</p>
        <div className="course-card__meta">
          <span>{course.category}</span>
          <strong>${course.price}</strong>
        </div>
        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;


