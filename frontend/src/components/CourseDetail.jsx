import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetailPage.css";

const API_BASE = "http://localhost:5000";  
const CourseDetailPage = () => {
  const { slug } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/courses/${slug}`);  
        const data = await res.json();
        setCourse(data.course);  
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) return <div className="loading">Loading course...</div>;
  if (!course) return <div className="not-found">Course not found</div>;

  return (
    <div className="course-detail">
      <header className="course-detail__header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <span className="price">₹{course.price}</span>  
      </header>
      
      <section className="course-syllabus">
        <h2>Syllabus</h2>
        <ul>
          {course.lessons?.map((lesson, idx) => (  
            <li key={idx}>
              <strong>{lesson.title}</strong>
              <p>{lesson.contentHtml || 'Lesson content'}</p>
            </li>
          )) || <p>No lessons yet</p>}
        </ul>
      </section>
    </div>
  );
};

export default CourseDetailPage;
