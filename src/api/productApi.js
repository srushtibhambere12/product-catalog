const API_URL = 'https://dummyjson.com/products?limit=0';

// limit=0 returns all the products in one call
export async function getProducts() {
  let response;

  try {
    response = await fetch(API_URL);
  } catch {
    throw new Error('Could not connect to the server. Please check your internet connection.');
  }

  if (!response.ok) {
    throw new Error(`Something went wrong on the server (error ${response.status}).`);
  }

  const data = await response.json();
  return data.products || [];
}
