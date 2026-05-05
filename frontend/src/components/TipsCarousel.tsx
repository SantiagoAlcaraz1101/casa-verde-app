import { useEffect, useState } from 'react';
import './TipsCarousel.css';

const tips = [
  'Enjuaga los envases antes de reciclarlos.',
  'No mezcles residuos orgánicos con reciclables.',
  'Aplasta botellas plásticas para ahorrar espacio.',
  'Separa el papel limpio del contaminado.',
  'No reciclar servilletas usadas.',
];

export default function TipsCarousel() {
  const [index, setIndex] = useState(0);

  // Auto cambio cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((index + 1) % tips.length);
  const prev = () =>
    setIndex((index - 1 + tips.length) % tips.length);

  return (
    <section className="tips-card">
      <h3>💡 Recomendaciones para reciclar</h3>

      <div className="tips-content">
        <button onClick={prev}>‹</button>

        <p>{tips[index]}</p>

        <button onClick={next}>›</button>
      </div>

      <div className="tips-dots">
        {tips.map((_, i) => (
          <span
            key={i}
            className={i === index ? 'active' : ''}
          />
        ))}
      </div>
    </section>
  );
}