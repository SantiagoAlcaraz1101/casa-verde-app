import './PointsFeedback.css';

type Props = {
  points: number;
};

export default function PointsFeedback({ points }: Props) {
  return (
    <div className="points-feedback">
      +{points} puntos 🌱
    </div>
  );
}