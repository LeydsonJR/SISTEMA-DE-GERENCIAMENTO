import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const TeacherForm = ({ onAddTeacher }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    senha: '',
    data_nascimento: '',
    school_id: '',
  });
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch('http://localhost:5000/api/schools');
      const data = await response.json();
      setSchools(data.schools);
    };
    fetchSchools();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding teacher');
      }

      const data = await response.json();
      onAddTeacher(data);
    } catch (error) {
      setError('Error adding teacher');
    }
  };

  return (
    <div className="teacher-form">
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
          <label>Escola</label>
          <select
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma escola</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.nome}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

TeacherForm.propTypes = { onAddTeacher: PropTypes.func };

export default TeacherForm;
