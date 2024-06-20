import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    teacher_id: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch('http://localhost:5000/api/teachers');
      const data = await response.json();
      setTeachers(data.teachers);
    };
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding student');
      }

      const data = await response.json();
      onAddStudent(data);
    } catch (error) {
      setError('Error adding student');
    }
  };

  return (
    <div className="student-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Professor</label>
          <select
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um professor</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.nome}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

StudentForm.propTypes = { onAddStudent: PropTypes.func };
export default StudentForm;
