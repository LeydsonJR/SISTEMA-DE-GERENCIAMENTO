import { useState, useEffect } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students-list');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStudents(data); // Ajuste para data diretamente se a resposta for um array de students
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h2>Alunos Cadastrados</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <h3>{student.nome}</h3>
              <p>Professor: {student.professor_cpf}</p>{' '}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
