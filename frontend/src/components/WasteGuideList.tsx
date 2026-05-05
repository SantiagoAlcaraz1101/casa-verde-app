import { useEffect, useState } from 'react';
import { getWasteGuide } from '../api/wasteGuide.service';
import './WasteGuideList.css';

type WasteItem = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export default function WasteGuideList() {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const loadItems = async () => {
    try {
      const data = await getWasteGuide();
      setItems(data);
    } catch (error) {
      alert('No se pudo cargar la guía de residuos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <section className="waste-accordion">
      {/* BOTÓN */}
      <button
        className="waste-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>📘 Guía de separación de residuos</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {/* CONTENIDO */}
      {isOpen && (
        <div className="waste-content">
          {loading ? (
            <p className="waste-muted">Cargando guía...</p>
          ) : items.length === 0 ? (
            <p className="waste-muted">
              Aún no hay información disponible.
            </p>
          ) : (
            <div className="waste-grid">
              {items.map((item) => (
                <div className="waste-item" key={item.id}>
                  <span className="waste-icon">♻</span>
                  <h3>{item.name}</h3>
                  <strong>{item.category}</strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}