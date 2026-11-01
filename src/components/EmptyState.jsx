import './Status.css';

function EmptyState({ onClear }) {
  return (
    <div className="status-box">
      <h3>No products found</h3>
      <p>Try a different search word or category.</p>
      <button className="status-btn" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

export default EmptyState;
