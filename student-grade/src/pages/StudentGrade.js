import React, { useState } from 'react';
import StudentCard from '../components/StudentCard';
import '../style/StudentGrade.css';

function StudentGrade() {
  const [students, setStudents] = useState([
    { id: 1, name: "Zain", grade: 94 },
    { id: 2, name: "Ali", grade: 85 }
  ]);

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const addStudent = (e) => {
    e.preventDefault();
    if (!name || !grade) return;
    setStudents(prev => [
      ...prev,
      { id: prev.length + 1, name, grade: Number(grade) }
    ]);
    setName('');
    setGrade('');
  };

  // prev = current students array
// id = 2 (the student to delete)

// prev.filter(student => student.id !== 2)
// This keeps only students where student.id !== 2
// Result: [{id: 1, name: "Ali", grade: 85}, {id: 3, name: "Ahmed", grade: 78}]

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div className="grade-tracker-container">
      <h1 className="tracker-title">Student Grade Tracker</h1>

      <form onSubmit={addStudent} className="add-student-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="student-name-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Grade (0-100)"
            value={grade}
            onChange={e => setGrade(e.target.value)}
            className="grade-input-field"
            min="0"
            max="100"
            required
          />
        </div>
        <button type="submit" className="add-student-btn">
          Add Student
        </button>
      </form>

      <div className="students-list">
        {students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={deleteStudent}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentGrade;
