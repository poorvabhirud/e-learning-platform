import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const API_BASE = import.meta.env.VITE_API_URL;
const USER_ID = null;

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

useEffect(() => {
  async function loadEnrollments() {
    if (!user) return; 

    try {
      const id = user._id || user.id;
      console.log("Checking dashboard for User ID:", id);
      
      const res = await fetch(`${API_BASE}/courses/enrollments/${id}`);
      const data = await res.json();
      
      console.log("Dashboard API response:", data);

      const validEnrollments = Array.isArray(data)
        ? data.filter((e) => e && e.courseId)
        : [];

      setEnrollments(validEnrollments);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }

  loadEnrollments();
}, [user]); 


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
      </div>

      {loading && <div className="loading">Loading enrolled courses...</div>}

      {!loading && enrollments.length === 0 && (
        <div className="empty">No enrolled courses yet.</div>
      )}

      {!loading && enrollments.length > 0 && (
        <div className="enrollments-grid">
          {enrollments.map((enroll) => (
            <div className="enrollment-card" key={enroll._id}>
              <h2 className="course-title">{enroll.courseId?.title}</h2>
              <p className="course-description">{enroll.courseId?.description}</p>
              <p className="enrolled-date">
                Enrolled {new Date(enroll.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
