import "./AdminPage.css";
import React, { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const mockCourses = [
    { _id: "1", title: "React Basics", description: "Learn React", price: 999 },
    { _id: "2", title: "Node.js", description: "Backend", price: 1299 }
  ];

  useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    if (res.ok) {
      const data = await res.json();
      setCourses(data);
    }
  } catch (err) {
    console.log("API not ready yet:", err);
    setCourses(mockCourses); 
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const newCourse = {
      _id: Date.now().toString(),
      ...form,
      title: form.title
    };
    setCourses([newCourse, ...courses]);
    setForm({ title: "", description: "", price: 0 });
    setLoading(false);
  };

  const handleDelete = (courseId) => {
    if (!confirm("Delete?")) return;
    setCourses(courses.filter(c => c._id !== courseId));
  };

  return (
    <div className="admin-page">
      <div className="admin-page__inner">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage courses ({courses.length} total)</p>
        </header>

<section className="admin-grid">
  <div className="admin-card">
    <h2 className="admin-card__title">➕ Add New Course</h2>
    <form onSubmit={handleSubmit} className="course-form"> 
      <input
        className="form-input" 
        placeholder="Course Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        className="form-textarea" 
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows="3"
      />
      <input
  className="form-input"
  type="number"
  placeholder="Price ($)"  
  value={form.price || ''}  
  onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })}
  required
/>
      <button type="submit" className="form-button" disabled={loading}> 
        {loading ? "Adding..." : "➕ Add Course"}
      </button>
    </form>
  </div>

         
          <div className="admin-card">
            <h2>📋 All Courses</h2>
            <div className="courses-list">
              {courses.map((course) => (
                <div key={course._id} className="course-item">
                  <div>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <span>${course.price}</span>
                  </div>
                  <button onClick={() => handleDelete(course._id)}>
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
