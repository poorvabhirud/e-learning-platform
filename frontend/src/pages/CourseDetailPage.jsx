import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetailPage.css";
import { useAuthContext } from "../context/AuthContext.jsx"; 

const API_BASE = import.meta.env.VITE_API_URL;

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [progress, setProgress] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        setLoading(true);
        
        const courseRes = await fetch(`${API_BASE}/courses/${slug}`);
        const courseData = await courseRes.json();
        setCourse(courseData.course);
        
        if (user && user.id) { 
          try {
            const enrollRes = await fetch(`${API_BASE}/courses/enrollments/${user.id}`);
            if (enrollRes.ok) {
              const enrollData = await enrollRes.json();
              const userEnrollment = enrollData.find(e => {
                if (!e.courseId) return false;
                const eid = e.courseId._id || e.courseId;
                return eid.toString() === courseData.course._id.toString();
              });
              
              if (userEnrollment) {
                setEnrollmentId(userEnrollment._id);
                setProgress(userEnrollment.progress || {});
              }
            }
          } catch (e) { console.log("Not enrolled yet"); }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchCourseAndEnrollment(); 
  }, [slug, user]); 

  const toggleLesson = async (lessonId, completed) => {
    if (!enrollmentId) {
      alert('⚠️ Please enroll in the course first to track progress!');
      return;
    }
    
    try {
      setProgress(prev => ({ ...prev, [lessonId]: completed }));
      
      const res = await fetch(`${API_BASE}/courses/enrollments/${enrollmentId}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed })
      });
      
      if (!res.ok) throw new Error('Failed to save progress');
    } catch (err) {
      console.error('Progress error:', err);
      alert('❌ Save failed - Reverting state');
      setProgress(prev => ({ ...prev, [lessonId]: !completed }));
    }
  };

  if (loading) return <div className="course-container"><div className="loading">Loading...</div></div>;
  if (!course) return <div className="course-container"><div className="not-found">Course not found</div></div>;

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = (completedCount / (course.lessons?.length || 1)) * 100;

  return (
    <div className="course-container">
      <div className="course-header">
        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
        <div>
          <h1 className="course-title">{course.title}</h1>
          <p className="course-subtitle">{course.description}</p>
          <div className="course-meta">
            <span>{course.category} • {course.difficulty}</span>
            <strong>${course.price}</strong>
          </div>
        </div>
      </div>
      
      <div className="course-content">
        {enrollmentId && (
          <div className="progress-header">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="progress-text">{completedCount} / {course.lessons.length} lessons completed</div>
          </div>
        )}

        <div className="modules-section">
          <h2>📚 Course Content</h2>
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map((lesson, index) => {
              const lessonId = lesson._id || `lesson-${index}`;
              const isComplete = progress[lessonId];
              
              return (
                <div key={lessonId} className="module-item">
                  <div className="module-number" style={{
                    width: '40px', height: '40px', background: isComplete ? '#10b981' : '#6366f1',
                    color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: '0'
                  }}>
                    {index + 1}
                  </div>
                  <div className="module-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{lesson.title}</h3>
                      <button 
                        className={`complete-btn ${isComplete ? 'completed' : ''}`}
                        onClick={() => toggleLesson(lessonId, !isComplete)}
                      >
                        {isComplete ? '✓ Completed' : 'Mark Complete'}
                      </button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: lesson.contentHtml || lesson.content }} />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No lessons available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
