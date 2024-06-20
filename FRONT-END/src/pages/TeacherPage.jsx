import TeacherForm from '../components/TeacherForm';

const TeacherPage = () => {
  const handleAddTeacher = (teacher) => {
    console.log('Professor adicionado:', teacher);
    // Atualizar lista de professores ou redirecionar
  };

  return (
    <div className="teacher-page">
      <h2>Cadastro de Professor</h2>
      <TeacherForm onAddTeacher={handleAddTeacher} />
    </div>
  );
};

export default TeacherPage;
