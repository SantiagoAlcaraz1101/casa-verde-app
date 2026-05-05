import { useEffect, useState } from 'react';
import { getRanking } from '../api/ranking.service';
import { createEcoAction } from '../api/ecoActions.service';
import { getProfile } from '../api/users.service';
import WasteGuideList from '../components/WasteGuideList';
import TipsCarousel from '../components/TipsCarousel';
import './Dashboard.css';

type RankingUser = {
  id: string;
  name: string;
  points: number;
};

type UserProfile = {
  email: string;
  role: string;
};

export default function Dashboard() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const loadRanking = async () => {
    try {
      const data = await getRanking();
      setRanking(data);
    } catch {
      alert('No se pudo cargar el ranking');
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const user = await getProfile();
      setPoints(user.points || 0);
    } catch {
      console.log('No se pudo cargar perfil');
    }
  };

  useEffect(() => {
    loadRanking();
    loadProfile();
  }, []);

  const handleAction = async (type: string, pointsEarned: number) => {
    try {
      await createEcoAction({ type, points: pointsEarned });

      alert(`+${pointsEarned} puntos`);

      loadRanking();
      loadProfile(); // 🔥 actualizar puntos en pantalla
    } catch {
      alert('Error al registrar acción');
    }
  };

  return (
    <div className="dashboard-page">
      {/* HEADER */}
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
        {/* 🔥 PUNTOS DEL USUARIO */}
        <section className="points-card">
          <h2>🌿 Tus puntos ecológicos</h2>
          <p className="points-value">{points}</p>
        </section>

        <TipsCarousel />

        {/* ACCIONES */}
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

        {/* RANKING */}
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
                      <div className="ranking-position">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                      </div>

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