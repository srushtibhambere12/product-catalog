// returns stars like ★★★★☆ for a rating such as 4.2
export function getStars(rating) {
    const filled = Math.round(rating);
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

// the API price is already discounted, so we calculate the original price back
export function getOriginalPrice(price, discountPercentage) {
    return (price / (1 - discountPercentage / 100)).toFixed(2);
}