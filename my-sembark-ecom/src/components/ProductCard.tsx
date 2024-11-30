import React from 'react';
import { Link } from 'react-router';


type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow p-4">
      <img src={product.image} alt={product.title} className="h-40 w-full object-cover mb-4" />
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 underline mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
