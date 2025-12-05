// src/pages/Products.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/Products.css"; // connect CSS file

// Sample products data
const productsData = [
  { id: 1, name: "Apple iPhone 15", category: "Electronics", price: "$999", description: "Amazing camera!", image: "/images/Apple_iphone.jpg" },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: "$899", description: "Beautiful display!", image: "/images/Samsung.jpg" },
  { id: 3, name: "Nike Air Max", category: "Shoes", price: "$150", description: "Great comfort!", image: "/images/Mintra.jpg" },
  { id: 4, name: "Adidas Ultraboost", category: "Shoes", price: "$180", description: "Best running shoes!", image: "/images/Desert.jpg" },
  { id: 5, name: "The Great Gatsby", category: "Books", price: "$15", description: "Classic novel.", image: "/images/Grow_Rich.jpg" },
  { id: 6, name: "Atomic Habits", category: "Books", price: "$20", description: "Build habits easily.", image: "/images/C++_Programming.jpg" },
{ id: 7, name: "Smart Watch", category: "Electronics", price: "$60", description: "Build habits easily.", image: "/images/smart_watch.jpg" }


];

// Categories
const categories = ["All", ...new Set(productsData.map(p => p.category))];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Filter products
  const filteredProducts = productsData.filter((product) => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="products-container">

      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: "#ff9900" }}>MyShop</h1>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </header>

      {/* Category Buttons */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <Link to={`/products/${product.id}`} className="details-btn">View Details</Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 40, textAlign: "center", padding: 20, color: "#555" }}>
        &copy; 2025 MyShop. All rights reserved.
      </footer>

    </div>
  );
}
