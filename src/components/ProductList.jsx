import ProductCard from './ProductCard';

function ProductList({ products, onSelect }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={() => onSelect(product)} />
      ))}
    </div>
  );
}

export default ProductList;
