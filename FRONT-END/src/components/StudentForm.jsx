import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    professor_cpf: '',
    senha: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/teachers-list');
        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }
        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      }
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
      const response = await fetch('http://localhost:3000/api/students', {
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
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        nome: '',
        cpf: '',
        senha: '',
        data_nascimento: '',
        professor_cpf: '',
      });
    } catch (error) {
      setError('Error adding student');
      console.error('Error adding student:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
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
            name="professor_cpf"
            value={formData.professor_cpf}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um professor</option>
            {teachers.map((teacher) => (
              <option key={teacher.cpf} value={teacher.cpf}>
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

StudentForm.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
};

export default StudentForm;
