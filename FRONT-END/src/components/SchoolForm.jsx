import { useState } from 'react';
import PropTypes from 'prop-types';
const SchoolForm = ({ onAddSchool }) => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding school!');
      }

      const data = await response.json();
      onAddSchool(data);
    } catch (error) {
      setError('School successfully registered!');
    }
  };

  return (
    <div className="school-form">
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
          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Add School</button>
      </form>
    </div>
  );
};

SchoolForm.propTypes = { onAddSchool: PropTypes.func };

export default SchoolForm;
