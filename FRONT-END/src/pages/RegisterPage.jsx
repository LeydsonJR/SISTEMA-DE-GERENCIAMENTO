import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const handleRegister = (user) => {
    console.log('Usuário registrado:', user);
    // Redirecionar ou atualizar o estado de registro
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
