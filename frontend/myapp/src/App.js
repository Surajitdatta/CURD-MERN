import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import toast, { Toaster } from 'react-hot-toast';  // Import toast

const App = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [editingProduct, setEditingProduct] = useState(null); // For updating

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
      toast.success('Products fetched successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch products.');
    }
  };

  // Handle form validation
  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      toast.error('All fields are required!');
      return false;
    }
    return true;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit for creating or updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (editingProduct) {
      // Update product
      try {
        await axios.put(`/api/products/${editingProduct._id}`, formData);
        fetchProducts();
        setEditingProduct(null);
        setFormData({ name: '', price: '', quantity: '' });
        toast.success('Product updated successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Failed to update product.');
      }
    } else {
      // Create new product
      try {
        await axios.post("/api/products", formData);
        fetchProducts();
        setFormData({ name: '', price: '', quantity: '' });
        toast.success('Product added successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Failed to add product.');
      }
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product.');
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
    toast('Editing product...');
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />  {/* Add Toaster component */}

      <h2>Product CRUD App</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Product Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Products List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
