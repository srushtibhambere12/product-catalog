import './ProductCard.css';
import { getStars, getOriginalPrice } from '../utils/helper';

function ProductCard({ product, onClick }) {

  return (
    <div className="product-card" onClick={onClick}>
      <div className="image-wrapper">
        <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" />
        {product.discountPercentage > 0 && (
          <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
      </div>
      {/* <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" /> */}

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-rating">
          <span className="stars">{getStars(product.rating)}</span> {product.rating.toFixed(1)}
        </p>
        <p className="product-price">
          ${product.price}
          {product.discountPercentage > 0 && (
            <span className="original-price">
              ${getOriginalPrice(product.price, product.discountPercentage)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
