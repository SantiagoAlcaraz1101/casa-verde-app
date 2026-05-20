import { useEffect, useState } from 'react';
import { getRanking } from '../api/ranking.service';
import { createEcoAction } from '../api/ecoActions.service';
import { getProfile } from '../api/users.service';
import WasteGuideList from '../components/WasteGuideList';
import TipsCarousel from '../components/TipsCarousel';
import PointsFeedback from '../components/PointsFeedback';
import UserActionsHistory from '../components/UserActionsHistory';
import Toast from '../components/Toast';
import './Dashboard.css';

type RankingUser = {
  id: string;
  name: string;
  points: number;
};

export default function Dashboard() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedbackPoints, setFeedbackPoints] = useState<number | null>(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

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

  useEffect(() => {
    loadRanking();
    loadProfile();
  }, []);

  const handleAction = async (type: string, pts: number) => {
    try {
      await createEcoAction({ type, points: pts });

      setFeedbackPoints(pts);

      setTimeout(() => {
        setFeedbackPoints(null);
      }, 2500);

      loadRanking();
      loadProfile();

      // 🔥 Esto obliga al historial a recargarse inmediatamente
      setHistoryRefreshKey((prev) => prev + 1);
    } catch {
      showToast('No se pudo registrar la acción', 'error');
    }
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
            <div
              className="action-card"
              onClick={() => handleAction('Reciclaje plástico', 10)}
            >
              ♻ Reciclé plástico
            </div>

            <div
              className="action-card"
              onClick={() => handleAction('Residuos orgánicos', 8)}
            >
              🍃 Separé orgánicos
            </div>

            <div
              className="action-card"
              onClick={() => handleAction('Reciclaje vidrio', 12)}
            >
              🍾 Reciclé vidrio
            </div>
          </div>
        </section>

        <UserActionsHistory refreshKey={historyRefreshKey} />

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