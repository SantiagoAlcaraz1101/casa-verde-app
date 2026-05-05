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

  if (loading) {
    return <p className="waste-muted">Cargando guía...</p>;
  }

  return (
    <section className="waste-card">
      <h2>Guía de separación de residuos</h2>

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
    </section>
  );
}