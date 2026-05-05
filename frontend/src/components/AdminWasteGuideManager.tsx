import { useEffect, useState } from 'react';
import {
  createWasteItem,
  getWasteGuide,
} from '../api/wasteGuide.service';
import './AdminWasteGuideManager.css';

type WasteItem = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export default function AdminWasteGuideManager() {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadItems = async () => {
    try {
      const data = await getWasteGuide();
      setItems(data);
    } catch (error) {
      alert('No se pudo cargar la guía');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!name || !category || !description) {
      alert('Completa todos los campos');
      return;
    }

    try {
      await createWasteItem({ name, category, description });

      setName('');
      setCategory('');
      setDescription('');
      setIsFormOpen(false);

      await loadItems();

      alert('Residuo agregado correctamente');
    } catch (error) {
      alert('No se pudo agregar el residuo');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <section className="admin-waste-entry-card">
        <div>
          <h2>Guía de residuos</h2>
          <p>
            Administra la información que verán los residentes para separar
            correctamente sus residuos.
          </p>
        </div>

        <button onClick={() => setIsPanelOpen(true)}>
          Gestionar guía de residuos
        </button>
      </section>

      {isPanelOpen && (
        <div className="admin-waste-overlay">
          <div className="admin-waste-modal">
            <div className="admin-waste-modal-header">
              <div>
                <h2>Gestionar guía de residuos</h2>
                <p>
                  Consulta los residuos registrados y agrega nuevos elementos a
                  la guía.
                </p>
              </div>

              <button
                className="admin-waste-close"
                onClick={() => {
                  setIsPanelOpen(false);
                  setIsFormOpen(false);
                }}
              >
                ✕
              </button>
            </div>

            <div className="admin-waste-actions">
              <button
                className="admin-waste-primary"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? 'Ocultar formulario' : 'Agregar residuo'}
              </button>

              <button
                className="admin-waste-secondary"
                onClick={() => {
                  setIsPanelOpen(false);
                  setIsFormOpen(false);
                }}
              >
                Volver
              </button>
            </div>

            {isFormOpen && (
              <div className="admin-waste-form">
                <input
                  placeholder="Nombre del residuo. Ej: Botella de vidrio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Categoría. Ej: Caneca blanca - Vidrio"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <textarea
                  placeholder="Descripción. Ej: Debe estar limpia, seca y sin tapa."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={handleCreate}>Guardar residuo</button>
              </div>
            )}

            <div className="admin-waste-list">
              <h3>Residuos registrados</h3>

              {loading ? (
                <p className="admin-waste-muted">Cargando residuos...</p>
              ) : items.length === 0 ? (
                <p className="admin-waste-muted">
                  Aún no hay residuos registrados.
                </p>
              ) : (
                <div className="admin-waste-grid">
                  {items.map((item) => (
                    <div className="admin-waste-item" key={item.id}>
                      <strong>{item.name}</strong>
                      <span>{item.category}</span>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}