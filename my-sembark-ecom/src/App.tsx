import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      
      <h1 className="text-blue-600 mb-4  text-2xl font-semibold">SEMBARK - E-Commerce Platform</h1>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </div>
  );
}

export default App;
