import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const HomePage = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  
  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;

  
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Extract unique categories for the filter
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Listing</h1>

      {/* Filter and Sort Options */}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        {/* Filter by Category */}
        <div>
          <h2 className="text-md mb-2">Filter by Category</h2>
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 border rounded ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort by Price */}
        <div className="mt-4 md:mt-0">
          <h2 className="text-md mb-2">Sort by Price</h2>
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sort: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </button>
        </div>
      </div>

      {/*All Product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="mt-4 inline-block text-blue-600">
              View Details ›
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
