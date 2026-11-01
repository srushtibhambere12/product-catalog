import './Status.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-box error">
      <h3>Oops! Failed to load products</h3>
      <p>{message}</p>
      <button className="status-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorMessage;
