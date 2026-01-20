import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../context/AuthContext.jsx";
import "./CoursesPage.css";

const API_BASE = "http://localhost:5000";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

    useEffect(() => {
    fetch(`${API_BASE}/api/courses/all`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'beginner') return matchesSearch && course.difficulty === 'beginner';
    if (filter === 'intermediate') return matchesSearch && course.difficulty === 'intermediate';
    if (filter === 'under50') return matchesSearch && course.price < 50;
    if (filter === '50plus') return matchesSearch && course.price >= 50;
    return matchesSearch;
  });


  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="courses-page">
       <h1>Courses ({filteredCourses.length})</h1>
      
      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'intermediate' ? 'active' : ''} onClick={() => setFilter('intermediate')}>Intermediate</button>
        <button className={filter === 'beginner' ? 'active' : ''} onClick={() => setFilter('beginner')}>Beginner</button>
        <button className={filter === 'under50' ? 'active' : ''} onClick={() => setFilter('under50')}>Under $50</button>
        <button className={filter === '50plus' ? 'active' : ''} onClick={() => setFilter('50plus')}>$50+</button>
      </div>
      <div className="search-container">
        <input 
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

