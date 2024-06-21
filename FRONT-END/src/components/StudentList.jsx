import { useState, useEffect } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:3000/api/student');
      const data = await response.json();
      setStudents(data.students);
    };
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h2>Alunos Cadastrados</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h3>{student.nome}</h3>
            <p>Professor: {student.teacher.nome}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
