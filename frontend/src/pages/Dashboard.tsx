import { useEffect, useState } from 'react';
import { getRanking } from '../api/ranking.service';
import WasteGuideList from '../components/WasteGuideList';
import './Dashboard.css';

type RankingUser = {
  id: string;
  name: string;
  points: number;
};

export default function Dashboard() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRanking = async () => {
    try {
      const data = await getRanking();
      setRanking(data);
    } catch (error) {
      alert('No se pudo cargar el ranking');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Casa Verde+</h1>
          <p>Ranking ecológico de la comunidad</p>
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
        {/* RESUMEN */}
        <section className="summary-card">
          <div>
            <span className="summary-icon">♻</span>
          </div>
          <div>
            <h2>Vecinos verdes</h2>
            <p>
              Los residentes con más puntos aparecen primero. Recicla más para
              subir en el ranking.
            </p>
          </div>
        </section>

        {/* RANKING */}
        <section className="ranking-card">
          <h2>Ranking de usuarios</h2>

          {loading ? (
            <p className="loading-text">Cargando ranking...</p>
          ) : ranking.length === 0 ? (
            <p className="loading-text">
              Aún no hay usuarios en el ranking.
            </p>
          ) : (
            <div className="ranking-list">
              {ranking.map((user, index) => (
                <div className="ranking-item" key={user.id}>
                  <div className="ranking-position">
                    {index === 0
                      ? '🥇'
                      : index === 1
                      ? '🥈'
                      : index === 2
                      ? '🥉'
                      : index + 1}
                  </div>

                  <div className="ranking-user">
                    <strong>{user.name}</strong>
                    <span>{user.points} puntos verdes</span>
                  </div>

                  <div className="ranking-points">{user.points}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* GUÍA DE RESIDUOS */}
        <WasteGuideList />
      </main>
    </div>
  );
}