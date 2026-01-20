import React from "react";
import CourseCard from "./CourseCard.jsx";

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p>No courses yet.</p>;
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id || course._id}
          title={course.title}
          level={course.difficulty}
          price={course.price === 0 ? "Free" : `₹${course.price}`}
        />
      ))}
    </div>
  );
};

export default CourseList;
