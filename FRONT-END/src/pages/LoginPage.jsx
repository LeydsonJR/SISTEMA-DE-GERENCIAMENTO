import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    // Redirecionar ou atualizar o estado de login
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
