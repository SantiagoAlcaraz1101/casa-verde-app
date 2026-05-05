import { useEffect, useState } from 'react';
import { getUsers } from '../api/users.service';
import { getRanking } from '../api/ranking.service';
import AdminWasteGuideManager from '../components/AdminWasteGuideManager';
import './AdminDashboard.css';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
  createdAt: string;
};

type RankingUser = {
  id: string;
  name: string;
  points: number;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const usersData = await getUsers();
      const rankingData = await getRanking();

      setUsers(usersData);
      setRanking(rankingData);
    } catch (error) {
      alert('No se pudo cargar la información del administrador');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalUsers = users.length;
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  const bestUser = ranking[0];

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Casa Verde+ Admin</h1>
          <p>Panel de administración de la comunidad ecológica</p>
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

      <main className="admin-content">
        <section className="admin-summary">
          <div className="admin-stat">
            <span>👥</span>
            <div>
              <h3>{totalUsers}</h3>
              <p>Usuarios registrados</p>
            </div>
          </div>

          <div className="admin-stat">
            <span>♻</span>
            <div>
              <h3>{totalPoints}</h3>
              <p>Puntos verdes acumulados</p>
            </div>
          </div>

          <div className="admin-stat">
            <span>🏆</span>
            <div>
              <h3>{bestUser ? bestUser.name : 'Sin datos'}</h3>
              <p>Usuario líder</p>
            </div>
          </div>
        </section>

        <AdminWasteGuideManager />

        <section className="admin-card">
          <h2>Usuarios de la comunidad</h2>

          {loading ? (
            <p className="admin-muted">Cargando usuarios...</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Puntos</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={
                            user.role === 'ADMIN'
                              ? 'role-admin'
                              : 'role-user'
                          }
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{user.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-card">
          <h2>Ranking ecológico</h2>

          <div className="admin-ranking-list">
            {ranking.map((user, index) => (
              <div className="admin-ranking-item" key={user.id}>
                <strong>
                  {index + 1}. {user.name}
                </strong>
                <span>{user.points} puntos</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}