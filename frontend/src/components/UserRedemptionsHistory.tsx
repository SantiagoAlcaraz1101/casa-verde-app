import { useEffect, useState } from 'react';
import { getMyRedemptions } from '../api/rewards.service';
import './UserRedemptionsHistory.css';

type Redemption = {
  id: string;
  pointsUsed: number;
  createdAt: string;
  reward: {
    name: string;
    description: string;
  };
};

type Props = {
  refreshKey: number;
};

export default function UserRedemptionsHistory({ refreshKey }: Props) {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRedemptions = async () => {
    try {
      setLoading(true);
      const data = await getMyRedemptions();
      setRedemptions(data);
    } catch {
      console.log('No se pudo cargar el historial de canjes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRedemptions();
  }, [refreshKey]);

  return (
    <section className="redemptions-accordion">
      <button
        className="redemptions-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🎟 Historial de canjes</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="redemptions-content">
          {loading ? (
            <p className="redemptions-muted">Cargando canjes...</p>
          ) : redemptions.length === 0 ? (
            <p className="redemptions-muted">
              Aún no has canjeado recompensas.
            </p>
          ) : (
            <div className="redemptions-list">
              {redemptions.map((item) => (
                <div className="redemption-item" key={item.id}>
                  <div>
                    <strong>{item.reward.name}</strong>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <p>{item.reward.description}</p>
                  </div>

                  <strong className="redemption-points">
                    -{item.pointsUsed} pts
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}