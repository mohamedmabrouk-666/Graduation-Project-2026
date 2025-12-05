import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styling/ProductDetails.css";

const productsData = [
  { id: 1, name: "Apple iPhone 15", category: "Electronics", price: "$999", description: "Latest iPhone with amazing camera and performance.", image: "/images/Apple_iphone.jpg" },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: "$899", description: "Powerful Android smartphone with high-res display.", image: "/images/Samsung.jpg" },

  {
    id: 3,
    name: "Nike Air Max",
    category: "Shoes",
    price: "$150",
    description: "Comfortable and stylish running shoes.",
    image: "/images/Mintra.jpg"
  },
  {
    id: 4,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: "$180",
    description: "High-performance sneakers for daily runs.",
    image: "/images/Desert.jpg"
  },
  {
    id: 5,
    name: "The Great Gatsby",
    category: "Books",
    price: "$15",
    description: "Classic novel by F. Scott Fitzgerald.",
    image: "/images/C++_Programming.jpg"
  },
  {
    id: 6,
    name: "Atomic Habits",
    category: "Books",
    price: "$20",
    description: "Self-help book by James Clear for building habits.",
    image: "/images/Grow_Rich.jpg"
  },
{
    id: 7,
    name: "Smart watch",
    category: "Electronics",
    price: "$60",
    description: "High-performance sneakers for daily runs.",
    image: "/images/smart_watch.jpg"
  }


];

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found 😔</h2>
        <p>Sorry, the product you're looking for does not exist.</p>
        <Link to="/products" className="back-button">Back to Products</Link>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${product.image})`,
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <div className="image-zoom-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <div className="zoom-result" style={zoomStyle}></div>
      </div>

      <h3>Category: {product.category}</h3>
      <h3>Price: {product.price}</h3>
      <p>{product.description}</p>

      <Link to="/products" className="back-button">Back to Products</Link>
      <button className="add-cart-button" onClick={() => alert("Product added to cart!")}>Add to Cart 🛒</button>
    </div>
  );
};

export default ProductDetails;
