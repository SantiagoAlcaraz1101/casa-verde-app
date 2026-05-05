import { useState } from 'react';
import { login } from '../api/auth.service';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('santiago@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login({ email, password });
      console.log(res);
      alert('Login exitoso');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">♻</div>

        <h1>Casa Verde+</h1>
        <p className="login-subtitle">
          Recicla, gana puntos y ayuda a tu comunidad.
        </p>

        <div className="login-form">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>

        <p className="login-footer">
          Proyecto académico de gestión inteligente de residuos
        </p>
      </div>
    </div>
  );
}