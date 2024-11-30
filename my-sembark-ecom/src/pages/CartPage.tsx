import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <img className="w-full h-40 object-cover rounded mb-4" src={item.image} alt={item.title} />
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <p className='mb-3'>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className='flex flex-row justify-around gap-10 sm:justify-end' >
          <button
            
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Pay Now
          </button>
          <div className="text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
