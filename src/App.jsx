import { useEffect, useState } from 'react';
import { getProducts } from './api/productApi';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // increasing this number makes the useEffect below run again (used by Try Again)
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [reloadKey]);

  function retry() {
    setLoading(true);
    setError('');
    setReloadKey(reloadKey + 1);
  }

  // unique category names for the dropdown
  const categories = [...new Set(products.map((p) => p.category))];

  // clean the search text before using it
  const searchText = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;

    const matchesSearch =
      product.title.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      (product.brand && product.brand.toLowerCase().includes(searchText));

    return matchesCategory && matchesSearch;
  });

  function clearFilters() {
    setSearch('');
    setCategory('all');
  }

  function renderContent() {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error} onRetry={retry} />;
    }
    if (filteredProducts.length === 0) {
      return <EmptyState onClear={clearFilters} />;
    }
    return <ProductList products={filteredProducts} onSelect={setSelectedProduct} />;
  }

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Filters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />

        {!loading && !error && (
          <p className="result-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        )}

        {renderContent()}
      </main>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;
