import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";
const USER_ID = "507f1f77bcf86cd799439011";

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/courses/enrollments/${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        console.log("RAW API:", data);

        const valid = data.filter(e => e.courseId !== null);

        setEnrollments(valid);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard ({enrollments.length} courses)</h1>

      {enrollments.map(enroll => (
        <div
          key={enroll._id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 15 }}
        >
          <h2>{enroll.courseId.title}</h2>
          <p>{enroll.courseId.description}</p>
        </div>
      ))}
    </div>
  );
}
