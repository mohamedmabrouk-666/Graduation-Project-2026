import { useState } from "react";
import "../styling/AdminDashboard.css"; // import CSS file

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 14", price: 28000, category: "Electronics" },
    { id: 2, name: "Nike Shoes", price: 1800, category: "Fashion" }
  ]);

  const [form, setForm] = useState({ name: "", price: "", category: "" });

  const handleAddProduct = () => {
    if (!form.name || !form.price || !form.category) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      category: form.category,
    };

    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", category: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-box">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        {/* Add Product Form */}
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>

        {/* Products Table */}
        <h3>Products List</h3>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price (EGP)</th>
              <th>Category</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
