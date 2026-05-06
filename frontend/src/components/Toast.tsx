import './Toast.css';

type Props = {
  message: string;
  type?: 'success' | 'error';
};

export default function Toast({
  message,
  type = 'success',
}: Props) {
  return (
    <div className={`toast toast-${type}`}>
      <span>
        {type === 'success' ? '✅' : '❌'}
      </span>

      <p>{message}</p>
    </div>
  );
}
