import { useEffect, useState } from 'react';
import {
  createWasteItem,
  getWasteGuide,
  deleteWasteItem,
} from '../api/wasteGuide.service';
import Toast from './Toast';
import './AdminWasteGuideManager.css';

type WasteItem = {
  id: string;
  name: string;
  category: string;
  description: string;
};

const categories = [
  'Caneca blanca - Plástico',
  'Caneca blanca - Vidrio',
  'Caneca blanca - Papel',
  'Caneca blanca - Cartón',
  'Caneca blanca - Metales',
  'Residuos orgánicos',
  'No aprovechable',
  'Residuo con tratamiento especial',
];

export default function AdminWasteGuideManager() {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<WasteItem | null>(null);

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

  const loadItems = async () => {
    try {
      const data = await getWasteGuide();
      setItems(data);
    } catch {
      showToast('No se pudo cargar la guía', 'error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const cleanName = name.trim();
    const cleanCategory = category.trim();
    const cleanDescription = description.trim();

    if (!cleanName || !cleanCategory || !cleanDescription) {
      showToast('Completa todos los campos', 'error');
      return false;
    }

    if (cleanName.length < 3) {
      showToast('El nombre debe tener mínimo 3 caracteres', 'error');
      return false;
    }

    if (cleanName.length > 60) {
      showToast('El nombre no puede superar 60 caracteres', 'error');
      return false;
    }

    if (cleanDescription.length < 10) {
      showToast('La descripción debe tener mínimo 10 caracteres', 'error');
      return false;
    }

    if (cleanDescription.length > 180) {
      showToast('La descripción no puede superar 180 caracteres', 'error');
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      await createWasteItem({
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
      });

      setName('');
      setCategory('');
      setDescription('');
      setIsFormOpen(false);

      await loadItems();

      showToast('Residuo agregado correctamente', 'success');
    } catch {
      showToast('No se pudo agregar el residuo', 'error');
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteWasteItem(itemToDelete.id);
      await loadItems();
      setItemToDelete(null);

      showToast('Residuo eliminado correctamente', 'success');
    } catch {
      showToast('No se pudo eliminar el residuo', 'error');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

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
                  setIsDeleteMode(false);
                  setItemToDelete(null);
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
                className={`admin-waste-delete-mode ${
                  isDeleteMode ? 'active' : ''
                }`}
                onClick={() => setIsDeleteMode(!isDeleteMode)}
              >
                {isDeleteMode ? 'Cancelar eliminación' : 'Eliminar'}
              </button>

              <button
                className="admin-waste-secondary"
                onClick={() => {
                  setIsPanelOpen(false);
                  setIsFormOpen(false);
                  setIsDeleteMode(false);
                  setItemToDelete(null);
                }}
              >
                Volver
              </button>
            </div>

            {isFormOpen && (
              <div className="admin-waste-form">
                <div>
                  <input
                    placeholder="Nombre del residuo"
                    value={name}
                    maxLength={60}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <small>{name.length}/60 caracteres</small>
                </div>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div>
                  <textarea
                    placeholder="Descripción"
                    value={description}
                    maxLength={180}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <small>{description.length}/180 caracteres</small>
                </div>

                <button onClick={handleCreate}>Guardar residuo</button>
              </div>
            )}

            <div className="admin-waste-list">
              <h3>Residuos registrados</h3>

              {loading ? (
                <p className="admin-waste-muted">Cargando...</p>
              ) : items.length === 0 ? (
                <p className="admin-waste-muted">No hay residuos aún.</p>
              ) : (
                <div className="admin-waste-grid">
                  {items.map((item) => (
                    <div className="admin-waste-item" key={item.id}>
                      {isDeleteMode && (
                        <button
                          className="admin-waste-delete-icon"
                          onClick={() => setItemToDelete(item)}
                        >
                          −
                        </button>
                      )}

                      <div className="admin-waste-item-content">
                        <strong>{item.name}</strong>
                        <span>{item.category}</span>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {itemToDelete && (
              <div className="delete-modal-overlay">
                <div className="delete-modal">
                  <div className="delete-modal-icon">⚠️</div>

                  <h3>¿Eliminar residuo?</h3>

                  <p>
                    Vas a eliminar <strong>{itemToDelete.name}</strong>. Esta acción no se
                    puede deshacer.
                  </p>

                  <div className="delete-modal-actions">
                    <button className="delete-modal-danger" onClick={handleDelete}>
                      Sí, eliminar
                    </button>

                    <button
                      className="delete-modal-cancel"
                      onClick={() => setItemToDelete(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}