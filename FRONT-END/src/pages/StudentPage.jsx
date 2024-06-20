import StudentForm from '../components/StudentForm';

const StudentPage = () => {
  const handleAddStudent = (student) => {
    console.log('Aluno adicionado:', student);
    // Atualizar lista de alunos ou redirecionar
  };

  return (
    <div className="student-page">
      <h2>Cadastro de Aluno</h2>
      <StudentForm onAddStudent={handleAddStudent} />
    </div>
  );
};

export default StudentPage;
