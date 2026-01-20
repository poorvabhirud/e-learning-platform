import React from "react";

const LessonPlayer = ({ lesson }) => {
  if (!lesson) {
    return <div>Select a lesson to view its content.</div>;
  }

  return (
    <article className="lesson-player">
      <h3>{lesson.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: lesson.contentHtml }} />
    </article>
  );
};

export default LessonPlayer;
