import { useEffect, useState } from 'react';
import { getStars, getOriginalPrice } from '../utils/helper';
import './ProductModal.css';

function ProductModal({ product, onClose }) {
  const [mainImage, setMainImage] = useState(product.images[0] || product.thumbnail);
  const reviews = product.reviews || [];

  // close the modal when Escape is pressed
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation so clicking inside the box does not close it */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-content">
          <div className="modal-gallery">
            <img src={mainImage} alt={product.title} className="modal-main-image" />

            {product.images.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className={img === mainImage ? 'thumb active' : 'thumb'}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="modal-details">
            <p className="product-category">{product.category}</p>

            <h2>{product.title}</h2>
            {product.brand && <p className="modal-brand">by {product.brand}</p>}

            <p className="modal-rating">
              <span className="stars">{getStars(product.rating)}</span> {product.rating.toFixed(1)} / 5
              <span className="review-count">({reviews.length} reviews)</span>
            </p>

            <span className={product.stock > 0 ? 'stock-badge in-stock' : 'stock-badge out-of-stock'}>
              {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
            <p className="modal-description">{product.description}</p>

            <div className="modal-price-row">
              <span className="modal-price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="modal-original-price">
                    ${getOriginalPrice(product.price, product.discountPercentage)}
                  </span>
                  <span className="modal-discount">{Math.round(product.discountPercentage)}% OFF</span>
                </>
              )}
            </div>

            <h4>Specifications</h4>
            <table className="spec-table">
              <tbody>
                {product.brand && (
                  <tr>
                    <td>Brand</td>
                    <td>{product.brand}</td>
                  </tr>
                )}
                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>{product.stock}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>{product.discountPercentage}%</td>
                </tr>
                {product.weight && (
                  <tr>
                    <td>Weight</td>
                    <td>{product.weight} g</td>
                  </tr>
                )}
                {product.dimensions && (
                  <tr>
                    <td>Dimensions</td>
                    <td>
                      {product.dimensions.width} x {product.dimensions.height} x{' '}
                      {product.dimensions.depth} cm
                    </td>
                  </tr>
                )}
                {product.warrantyInformation && (
                  <tr>
                    <td>Warranty</td>
                    <td>{product.warrantyInformation}</td>
                  </tr>
                )}
                {product.shippingInformation && (
                  <tr>
                    <td>Shipping</td>
                    <td>{product.shippingInformation}</td>
                  </tr>
                )}
                {product.returnPolicy && (
                  <tr>
                    <td>Return Policy</td>
                    <td>{product.returnPolicy}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="reviews-section">
            <h4>Customer Reviews ({reviews.length})</h4>
            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <strong>{review.reviewerName}</strong>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="stars">{getStars(review.rating)}</span>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductModal;
