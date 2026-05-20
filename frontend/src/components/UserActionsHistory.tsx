import { useEffect, useState } from 'react';
import { getEcoActions } from '../api/ecoActions.service';
import './UserActionsHistory.css';

type EcoAction = {
  id: string;
  type: string;
  points: number;
  createdAt: string;
};

type Props = {
  refreshKey: number;
};

export default function UserActionsHistory({ refreshKey }: Props) {
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const loadActions = async () => {
    try {
      setLoading(true);
      const data = await getEcoActions();
      setActions(data);
    } catch {
      console.log('No se pudo cargar el historial');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, [refreshKey]);

  return (
    <section className="history-accordion">
      <button
        className="history-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>📋 Historial de acciones</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="history-content">
          {loading ? (
            <p className="history-muted">Cargando historial...</p>
          ) : actions.length === 0 ? (
            <p className="history-muted">
              Aún no has registrado acciones ecológicas.
            </p>
          ) : (
            <div className="history-list">
              {actions.map((action) => (
                <div className="history-item" key={action.id}>
                  <div>
                    <strong>{action.type}</strong>
                    <span>
                      {new Date(action.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p>+{action.points} pts</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}