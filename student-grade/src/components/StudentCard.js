import React, { useState } from 'react';
import './StudentCard.css';

function StudentCard({ student, onDelete }) {
  const [grade, setGrade] = useState(student.grade);

  const getGradeColor = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 90) return '#28a745'; // Green for A
    if (numGrade >= 80) return '#17a2b8'; // Blue for B
    if (numGrade >= 70) return '#ffc107'; // Yellow for C
    if (numGrade >= 60) return '#fd7e14'; // Orange for D
    if (numGrade >= 50) return '#ffc107'; // Yellow for C
    return '#dc3545'; // Red for F
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id);
    }
  };

  return (
    <div className="student-card">
      <div className="student-header">
        <h3 className="student-name">{student.name}</h3>
        <div className="header-actions">
          <div className="student-id">ID: {student.id}</div>
          <button className="delete-btn" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      </div>
      
      <div className="grade-section">
        <label className="grade-label">Grade:</label>
        <input
          type="number"
          value={grade}
          className="grade-input"
          disabled
          style={{ 
            color: getGradeColor(grade),
            fontWeight: 'bold'
          }}
        />
        <span className="grade-status">
          {parseFloat(grade) >= 90 ? 'A' : 
           parseFloat(grade) >= 80 ? 'B' : 
           parseFloat(grade) >= 70 ? 'C' : 
           parseFloat(grade) >= 60 ? 'D' : 
           parseFloat(grade) >= 50 ? 'E' :
           'F'}
        </span>
      </div>
    </div>
  );
}

export default StudentCard;
