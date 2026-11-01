# ShopEasy - Product Catalog

A responsive product catalog web app made with React. It shows products from the DummyJSON API, and you can search them, filter them by category and click a product to see its full details.

**Live Demo:** (add your link here)

## Features

- Products loaded from https://dummyjson.com/products
- Product cards show image, title, category, price and rating
- Search box that filters products while typing (by name, brand or category)
- Category dropdown filter
- Product details popup with image gallery, description and specifications
- Loading spinner while data is loading
- "No products found" message with a Clear Filters button
- Error message with a Try Again button if the API fails
- Error boundary so the app does not show a blank page if something crashes
- Responsive layout for desktop, tablet and mobile

## Setup Instructions

You need Node.js (version 20 or above) installed.

```bash
git clone https://github.com/<your-username>/product-catalog.git
cd product-catalog
npm install
npm run dev
```

Then open http://localhost:5173 in the browser.

To make a production build:

```bash
npm run build
```

## Tech Stack

- **React** (with Vite) - for building the UI with components
- **JavaScript**
- **Plain CSS** - one CSS file for each component
- **React hooks** (`useState`, `useEffect`) for state management
- **Fetch API** for calling the products API

## Folder Structure

```
src/
  api/
    productApi.js       -> function that fetches products from the API
  components/
    Navbar.jsx          -> top bar
    Filters.jsx         -> search box and category dropdown
    ProductList.jsx     -> grid of products
    ProductCard.jsx     -> single product card
    ProductModal.jsx    -> popup with product details
    Loader.jsx          -> loading spinner
    EmptyState.jsx      -> shown when no product matches
    ErrorMessage.jsx    -> shown when the API fails
    ErrorBoundary.jsx   -> catches unexpected errors
  App.jsx               -> main component, holds the state and filter logic
  main.jsx              -> entry point
```

## Architectural Decisions

- **API code is kept separate** in `api/productApi.js`, so components don't call fetch directly. If the API changes, only this file needs to change.
- **All products are loaded in one request** (`limit=0`, about 194 products). Since the data is small, search and filter happen on the frontend and results show instantly. For a very large catalog this would not scale, and server-side search with pagination would be better.
- **No Redux or other state library.** The app only has one page and a few pieces of state (products, search, category, selected product), so `useState` in `App.jsx` is enough.
- **Search checks title, brand and category.** I first searched only by title, but then searching "laptops" showed only 2 of the 5 laptops because some laptop names don't contain the word "laptop". Checking brand and category as well fixed this.
- **Search input is cleaned** with `trim()` and `toLowerCase()` and limited to 50 characters. React also escapes text automatically, so user input can't inject HTML.
- **Modal instead of a separate page**, so the user keeps their search and filter when they close it. It closes with the X button, the Escape key or by clicking outside.
- **Plain CSS with media queries** for responsiveness: 4 columns on desktop, 3 on tablet, 2 on mobile.

## Future Enhancements

- Sort products by price or rating
- Pagination or infinite scroll
- Price range and rating filters
- Separate product page with its own URL using React Router
- Skeleton loading cards instead of a spinner
- Save search and filters in the URL
- Add to cart and wishlist
- Dark mode
- Unit tests with Jest / React Testing Library
