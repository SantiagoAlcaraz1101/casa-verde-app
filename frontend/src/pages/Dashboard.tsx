import { useEffect, useState } from 'react';
import { getRanking } from '../api/ranking.service';
import { createEcoAction } from '../api/ecoActions.service';
import { getProfile } from '../api/users.service';
import { getEcoActionConfigs } from '../api/ecoActionConfig.service';
import WasteGuideList from '../components/WasteGuideList';
import TipsCarousel from '../components/TipsCarousel';
import PointsFeedback from '../components/PointsFeedback';
import UserActionsHistory from '../components/UserActionsHistory';
import UserRewards from '../components/UserRewards';
import UserRedemptionsHistory from '../components/UserRedemptionsHistory';
import Toast from '../components/Toast';
import './Dashboard.css';

type RankingUser = {
  id: string;
  name: string;
  points: number;
};

type EcoActionConfig = {
  id: string;
  key: string;
  label: string;
  points: number;
};

export default function Dashboard() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [actionConfigs, setActionConfigs] = useState<EcoActionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedbackPoints, setFeedbackPoints] = useState<number | null>(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [redemptionsRefreshKey, setRedemptionsRefreshKey] = useState(0);

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

  const loadRanking = async () => {
    try {
      const data = await getRanking();
      setRanking(data);
    } catch {
      showToast('No se pudo cargar el ranking', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const user = await getProfile();
      setPoints(user.points || 0);
    } catch {
      showToast('No se pudo cargar tu perfil', 'error');
    }
  };

  const loadActionConfigs = async () => {
    try {
      const data = await getEcoActionConfigs();
      setActionConfigs(data);
    } catch {
      showToast('No se pudieron cargar los puntajes', 'error');
    }
  };

  useEffect(() => {
    loadRanking();
    loadProfile();
    loadActionConfigs();
  }, []);

  const refreshAfterAction = async () => {
    await loadRanking();
    await loadProfile();
    setHistoryRefreshKey((prev) => prev + 1);
  };

  const refreshAfterRedeem = async () => {
    await loadRanking();
    await loadProfile();
    setRedemptionsRefreshKey((prev) => prev + 1);
  };

  const handleAction = async (config: EcoActionConfig) => {
    try {
      await createEcoAction({
        type: config.label,
        points: config.points,
      });

      setFeedbackPoints(config.points);

      setTimeout(() => {
        setFeedbackPoints(null);
      }, 2500);

      refreshAfterAction();
    } catch {
      showToast('No se pudo registrar la acción', 'error');
    }
  };

  const getIcon = (key: string) => {
    if (key === 'plastic') return '♻';
    if (key === 'organic') return '🍃';
    if (key === 'glass') return '🍾';

    return '🌱';
  };

  return (
    <div className="dashboard-page">
      {toast && <Toast message={toast.message} type={toast.type} />}
      {feedbackPoints && <PointsFeedback points={feedbackPoints} />}

      <header className="dashboard-header">
        <div>
          <h1>Casa Verde+</h1>
          <p>Tu impacto ecológico comienza hoy 🌱</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="dashboard-content">
        <section className="points-card">
          <h2>🌿 Tus puntos ecológicos</h2>
          <p className="points-value">{points}</p>
        </section>

        <TipsCarousel />

        <section className="actions-section">
          <h2>Acciones ecológicas</h2>

          <div className="actions-grid">
            {actionConfigs.map((config) => (
              <div
                className="action-card"
                key={config.id}
                onClick={() => handleAction(config)}
              >
                {getIcon(config.key)} {config.label}

                <span className="action-points">
                  +{config.points} pts
                </span>
              </div>
            ))}
          </div>
        </section>

        <UserRewards
          currentPoints={points}
          onRedeemSuccess={refreshAfterRedeem}
        />

        <UserActionsHistory refreshKey={historyRefreshKey} />

        <UserRedemptionsHistory refreshKey={redemptionsRefreshKey} />

        <section className="ranking-accordion">
          <button
            className="ranking-toggle"
            onClick={() => setIsRankingOpen(!isRankingOpen)}
          >
            <span>🏆 Ranking ecológico</span>
            <span>{isRankingOpen ? '−' : '+'}</span>
          </button>

          {isRankingOpen && (
            <div className="ranking-content">
              {loading ? (
                <p className="loading-text">Cargando...</p>
              ) : (
                <div className="ranking-list">
                  {ranking.map((user, index) => (
                    <div className="ranking-item" key={user.id}>
                      <div className="ranking-position">{index + 1}</div>

                      <div className="ranking-user">
                        <strong>{user.name}</strong>
                        <span>{user.points} puntos</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <WasteGuideList />
      </main>
    </div>
  );
}