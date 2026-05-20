import { useEffect, useState } from 'react';
import {
  getEcoActionConfigs,
  updateEcoActionPoints,
} from '../api/ecoActionConfig.service';
import Toast from './Toast';
import './AdminPointsManager.css';

type EcoActionConfig = {
  id: string;
  key: string;
  label: string;
  points: number;
};

export default function AdminPointsManager() {
  const [configs, setConfigs] = useState<EcoActionConfig[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const loadConfigs = async () => {
    try {
      const data = await getEcoActionConfigs();
      setConfigs(data);
    } catch {
      showToast('No se pudieron cargar los puntajes', 'error');
    }
  };

  const handleChange = (id: string, value: string) => {
    const points = Number(value);

    setConfigs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, points } : item,
      ),
    );
  };

  const handleSave = async (id: string, points: number) => {
    if (points < 1 || points > 100) {
      showToast('El puntaje debe estar entre 1 y 100', 'error');
      return;
    }

    try {
      await updateEcoActionPoints(id, points);
      showToast('Puntaje actualizado correctamente', 'success');
      await loadConfigs();
    } catch {
      showToast('No se pudo actualizar el puntaje', 'error');
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="admin-points-card">
        <div>
          <h2>Puntajes ecológicos</h2>
          <p>
            Define cuántos puntos recibe un usuario por cada acción ecológica.
          </p>
        </div>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Ocultar puntajes' : 'Gestionar puntajes'}
        </button>
      </section>

      {isOpen && (
        <section className="admin-points-panel">
          <h3>Configuración de puntajes</h3>

          <div className="admin-points-list">
            {configs.map((item) => (
              <div className="admin-points-item" key={item.id}>
                <div>
                  <strong>{item.label}</strong>
                  <span>Clave: {item.key}</span>
                </div>

                <div className="admin-points-actions">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={item.points}
                    onChange={(e) =>
                      handleChange(item.id, e.target.value)
                    }
                  />

                  <button
                    onClick={() =>
                      handleSave(item.id, item.points)
                    }
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}