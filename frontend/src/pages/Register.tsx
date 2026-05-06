import { useState } from 'react';
import { register } from '../api/auth.service';
import Toast from '../components/Toast';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'error',
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Completa todos los campos', 'error');
      return false;
    }

    if (name.trim().length < 3) {
      showToast(
        'El nombre debe tener mínimo 3 caracteres',
        'error',
      );
      return false;
    }

    if (!email.includes('@')) {
      showToast('Ingresa un correo válido', 'error');
      return false;
    }

    if (password.length < 6) {
      showToast(
        'La contraseña debe tener mínimo 6 caracteres',
        'error',
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      showToast(
        'Registro exitoso. Ahora puedes iniciar sesión.',
        'success',
      );

      setTimeout(() => {
        window.location.href = '/';
      }, 1800);
    } catch {
      showToast(
        'No se pudo registrar. El correo ya existe.',
        'error',
      );
    }
  };

  return (
    <div className="register-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      <div className="register-card">
        <div className="register-logo">🌱</div>

        <h1>Crear cuenta</h1>

        <p className="register-subtitle">
          Únete a Casa Verde+ y empieza a sumar puntos
          ecológicos.
        </p>

        <div className="register-form">
          <label>Nombre completo</label>

          <input
            type="text"
            placeholder="Ej: Carlos Pérez"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="Ej: correo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>
            Registrarme
          </button>
        </div>

        <p className="register-footer">
          ¿Ya tienes cuenta?{' '}
          <span
            onClick={() =>
              (window.location.href = '/')
            }
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}