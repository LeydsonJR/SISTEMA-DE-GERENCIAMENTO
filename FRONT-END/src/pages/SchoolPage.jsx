import SchoolForm from '../components/SchoolForm';

const SchoolPage = () => {
  const handleAddSchool = (school) => {
    console.log('Escola adicionada:', school);
    // Atualizar lista de escolas ou redirecionar
  };

  return (
    <div className="school-page">
      <h2>Cadastro de Escola</h2>
      <SchoolForm onAddSchool={handleAddSchool} />
    </div>
  );
};

export default SchoolPage;
