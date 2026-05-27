import { useEffect, useState } from 'react';
import {
  getAvailableRewards,
  redeemReward,
} from '../api/rewards.service';
import Toast from './Toast';
import './UserRewards.css';

type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
};

type Props = {
  currentPoints: number;
  onRedeemSuccess: () => void;
};

export default function UserRewards({
  currentPoints,
  onRedeemSuccess,
}: Props) {
  const [rewards, setRewards] = useState<Reward[]>([]);
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

  const loadRewards = async () => {
    try {
      const data = await getAvailableRewards();
      setRewards(data);
    } catch {
      showToast('No se pudieron cargar las recompensas', 'error');
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  const handleRedeem = async (rewardId: string) => {
    try {
      await redeemReward(rewardId);

      showToast('Recompensa canjeada correctamente', 'success');

      await loadRewards();
      onRedeemSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'No se pudo canjear la recompensa';

      showToast(message, 'error');
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="user-rewards-card">
        <div>
          <h2>🎁 Recompensas ecológicas</h2>

          <p>
            Canjea tus puntos verdes por beneficios ecológicos disponibles.
          </p>
        </div>

        <button onClick={() => setIsOpen(true)}>
          Ver recompensas
        </button>
      </section>

      {isOpen && (
        <div className="user-rewards-overlay">
          <div className="user-rewards-modal">
            <div className="user-rewards-header">
              <div>
                <h2>🎁 Recompensas ecológicas</h2>

                <p>
                  Selecciona una recompensa disponible y canjéala con tus puntos
                  verdes.
                </p>
              </div>

              <button
                className="user-rewards-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {rewards.length === 0 ? (
              <p className="user-rewards-empty">
                No hay recompensas disponibles por el momento.
              </p>
            ) : (
              <div className="user-rewards-grid">
                {rewards.map((reward) => {
                  const canRedeem = currentPoints >= reward.pointsCost;

                  return (
                    <div className="user-reward-item" key={reward.id}>
                      <div>
                        <h3>{reward.name}</h3>
                        <p>{reward.description}</p>
                      </div>

                      <div className="reward-info">
                        <span>⭐ {reward.pointsCost} pts</span>
                        <span>📦 {reward.stock}</span>
                      </div>

                      <button
                        disabled={!canRedeem}
                        className={
                          canRedeem
                            ? 'redeem-btn'
                            : 'redeem-btn disabled'
                        }
                        onClick={() => handleRedeem(reward.id)}
                      >
                        {canRedeem ? 'Canjear' : 'Puntos insuficientes'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="user-rewards-actions">
              <button onClick={() => setIsOpen(false)}>Volver</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}