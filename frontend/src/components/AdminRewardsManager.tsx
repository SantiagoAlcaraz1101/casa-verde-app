import { useEffect, useState } from 'react';
import {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
} from '../api/rewards.service';
import Toast from './Toast';
import './AdminRewardsManager.css';

type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
  isActive: boolean;
};

export default function AdminRewardsManager() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pointsCost, setPointsCost] = useState(50);
  const [stock, setStock] = useState(1);

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

  const loadRewards = async () => {
    try {
      const data = await getRewards();
      setRewards(data);
    } catch {
      showToast('No se pudieron cargar las recompensas', 'error');
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  const handleCreateReward = async () => {
    if (!name || !description || pointsCost <= 0 || stock <= 0) {
      showToast('Completa correctamente todos los campos', 'error');
      return;
    }

    try {
      await createReward({
        name,
        description,
        pointsCost,
        stock,
      });

      showToast('Recompensa creada correctamente', 'success');

      setName('');
      setDescription('');
      setPointsCost(50);
      setStock(1);

      loadRewards();
    } catch {
      showToast('No se pudo crear la recompensa', 'error');
    }
  };

  const handleUpdateReward = async (
    rewardId: string,
    updatedPointsCost: number,
    updatedStock: number,
  ) => {
    if (updatedPointsCost <= 0) {
      showToast('Los puntos deben ser mayores a 0', 'error');
      return;
    }

    if (updatedStock < 0) {
      showToast('El stock no puede ser negativo', 'error');
      return;
    }

    try {
      await updateReward(rewardId, {
        pointsCost: updatedPointsCost,
        stock: updatedStock,
      });

      showToast('Recompensa actualizada correctamente', 'success');
      loadRewards();
    } catch {
      showToast('No se pudo actualizar la recompensa', 'error');
    }
  };

  const handleDeleteReward = async (rewardId: string) => {
    const confirmed = window.confirm('¿Deseas eliminar esta recompensa?');

    if (!confirmed) return;

    try {
      await deleteReward(rewardId);

      showToast('Recompensa eliminada correctamente', 'success');
      loadRewards();
    } catch {
      showToast('No se pudo eliminar la recompensa', 'error');
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="admin-rewards-card">
        <div>
          <h2>Recompensas ecológicas</h2>

          <p>
            Gestiona las recompensas canjeables con puntos ecológicos.
          </p>
        </div>

        <button onClick={() => setIsOpen(true)}>
          Gestionar recompensas
        </button>
      </section>

      {isOpen && (
        <div className="admin-rewards-overlay">
          <div className="admin-rewards-modal">
            <div className="admin-rewards-header">
              <div>
                <h2>Gestión de recompensas</h2>

                <p>
                  Administra las recompensas disponibles para los usuarios.
                </p>
              </div>

              <button
                className="admin-rewards-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="reward-form">
              <input
                type="text"
                placeholder="Nombre de recompensa"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="reward-row">
                <input
                  type="number"
                  placeholder="Costo en puntos"
                  value={pointsCost}
                  onChange={(e) => setPointsCost(Number(e.target.value))}
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>

              <button
                className="reward-create-btn"
                onClick={handleCreateReward}
              >
                Agregar recompensa
              </button>
            </div>

            <div className="reward-list">
              {rewards.map((reward) => (
                <div className="reward-item" key={reward.id}>
                  <div>
                    <strong>{reward.name}</strong>

                    <p>{reward.description}</p>
                  </div>

                  <div className="reward-edit-section">
                    <label>Puntos</label>

                    <input
                      type="number"
                      min={1}
                      value={reward.pointsCost}
                      onChange={(e) =>
                        setRewards((prev) =>
                          prev.map((item) =>
                            item.id === reward.id
                              ? {
                                  ...item,
                                  pointsCost: Number(e.target.value),
                                }
                              : item,
                          ),
                        )
                      }
                    />

                    <label>Stock</label>

                    <input
                      type="number"
                      min={0}
                      value={reward.stock}
                      onChange={(e) =>
                        setRewards((prev) =>
                          prev.map((item) =>
                            item.id === reward.id
                              ? {
                                  ...item,
                                  stock: Number(e.target.value),
                                }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>

                  <div className="reward-meta">
                    <span>⭐ {reward.pointsCost} pts</span>
                    <span>📦 {reward.stock}</span>
                  </div>

                  <div className="reward-admin-actions">
                    <button
                      className="reward-save-btn"
                      onClick={() =>
                        handleUpdateReward(
                          reward.id,
                          reward.pointsCost,
                          reward.stock,
                        )
                      }
                    >
                      Guardar
                    </button>

                    <button
                      className="reward-delete-btn"
                      onClick={() => handleDeleteReward(reward.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-rewards-actions">
              <button onClick={() => setIsOpen(false)}>Volver</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}