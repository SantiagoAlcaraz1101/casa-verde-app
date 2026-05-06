import { useState } from 'react';
import { login } from '../api/auth.service';
import Toast from '../components/Toast';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('santiago@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      showToast('Completa correo y contraseña', 'error');
      return false;
    }

    if (!email.includes('@')) {
      showToast('Ingresa un correo válido', 'error');
      return false;
    }

    if (password.length < 6) {
      showToast('La contraseña debe tener mínimo 6 caracteres', 'error');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await login({
        email: email.trim(),
        password,
      });

      showToast('Inicio de sesión exitoso', 'success');

      setTimeout(() => {
        if (res.user.role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }, 1200);
    } catch {
      showToast('Correo o contraseña incorrectos', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {toast && <Toast message={toast.message} type={toast.type} />}

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
          ¿No tienes cuenta?{' '}
          <span
            style={{
              color: '#16a34a',
              fontWeight: 900,
              cursor: 'pointer',
            }}
            onClick={() => (window.location.href = '/register')}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}