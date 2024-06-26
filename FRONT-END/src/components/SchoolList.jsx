import { useState, useEffect } from 'react';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch('http://localhost:3000/api/school-list');
      const data = await response.json();
      setSchools(data);
    };
    fetchSchools();
  }, []);
  return (
    <div className="school-list">
      <h2>Escolas Cadastradas</h2>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            <h3>{school.nome}</h3>
            <p>{school.endereco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
