import './Filters.css';

function Filters({ search, onSearchChange, category, onCategoryChange, categories }) {
  return (
    <div className="filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, brand or category..."
        value={search}
        maxLength={50}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="category-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
