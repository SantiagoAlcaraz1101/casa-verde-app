import { useEffect, useState } from 'react';
import { getUsers } from '../api/users.service';
import { getRanking } from '../api/ranking.service';
import AdminWasteGuideManager from '../components/AdminWasteGuideManager';
import AdminPointsManager from '../components/AdminPointsManager';
import AdminRewardsManager from '../components/AdminRewardsManager';
import Toast from '../components/Toast';
import './AdminDashboard.css';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [ranking, setRanking] = useState<User[]>([]);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);

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

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      showToast(
        'No se pudieron cargar los usuarios',
        'error',
      );
    }
  };

  const loadRanking = async () => {
    try {
      const data = await getRanking();
      setRanking(data);
    } catch {
      showToast(
        'No se pudo cargar el ranking',
        'error',
      );
    }
  };

  useEffect(() => {
    loadUsers();
    loadRanking();
  }, []);

  const totalPoints = ranking.reduce(
    (acc, user) => acc + user.points,
    0,
  );

  const bestUser =
    ranking.length > 0
      ? ranking[0].name
      : 'Sin datos';

  return (
    <div className="admin-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      <header className="admin-header">
        <div>
          <h1>Casa Verde+ Admin</h1>

          <p>
            Panel de administración de la
            comunidad ecológica
          </p>
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
        <section className="admin-stats">
          <div className="admin-card">
            <span className="admin-card-icon">
              👥
            </span>

            <h2>{users.length}</h2>

            <p>Usuarios registrados</p>
          </div>

          <div className="admin-card">
            <span className="admin-card-icon">
              ♻
            </span>

            <h2>{totalPoints}</h2>

            <p>Puntos ecológicos totales</p>
          </div>

          <div className="admin-card">
            <span className="admin-card-icon">
              🏆
            </span>

            <h2>{bestUser}</h2>

            <p>Usuario líder</p>
          </div>
        </section>

        <section className="admin-accordion">
          <button
            className="admin-toggle"
            onClick={() =>
              setIsUsersOpen(!isUsersOpen)
            }
          >
            <span>
              👥 Usuarios de la comunidad
            </span>

            <span>
              {isUsersOpen ? '−' : '+'}
            </span>
          </button>

          {isUsersOpen && (
            <div className="admin-content-box">
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
            </div>
          )}
        </section>

        <section className="admin-accordion">
          <button
            className="admin-toggle"
            onClick={() =>
              setIsRankingOpen(!isRankingOpen)
            }
          >
            <span>
              🏆 Ranking ecológico
            </span>

            <span>
              {isRankingOpen ? '−' : '+'}
            </span>
          </button>

          {isRankingOpen && (
            <div className="admin-content-box">
              <div className="admin-ranking-list">
                {ranking.map((user, index) => (
                  <div
                    className="admin-ranking-item"
                    key={user.id}
                  >
                    <strong>
                      {index + 1}. {user.name}
                    </strong>

                    <span>
                      {user.points} puntos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <AdminPointsManager />

        <AdminRewardsManager />

        <AdminWasteGuideManager />
      </main>
    </div>
  );
}