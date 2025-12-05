import React, { useState } from "react";

export default function Cart() {
  // Dummy cart items (later from backend)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 80,
      quantity: 1,
      image: "https://images-na.ssl-images-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 120,
      quantity: 2,
      image: "https://m.media-amazon.com/images/I/71YB2xkAxgL._AC_SL1500_.jpg"
    }
  ]);

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? 
      { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Shopping Cart 🛒</h2>

      {cartItems.map(item => (
        <div key={item.id} style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px"
        }}>
          <img src={item.image} alt="" style={{ width: "80px", marginRight: "10px" }} />
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>${item.price} each</p>
            <div>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>
          <button onClick={() => removeItem(item.id)} style={{ color: "red" }}>Remove</button>
        </div>
      ))}

      <h3>Total: ${totalPrice}</h3>

      <button style={{
        padding: "12px 20px",
        backgroundColor: "#FFD814",
        border: "1px solid #FCD200",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
      }}>
        Proceed to Checkout ✅
      </button>
    </div>
  );
}
