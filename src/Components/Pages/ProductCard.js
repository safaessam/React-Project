import React, { useState, useEffect } from 'react';
import Products from './Products';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const CategoryComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when the category changes
  }, [selectedCategory]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = [];

  if (selectedCategory === 'all') {
    currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  } else {
    currentProducts = allProducts
      .filter((product) => product.category === selectedCategory)
      .slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='container'>
      <div className="Category_Container">
        <div className="Category_Items">
          <button onClick={() => setSelectedCategory('all')}>All Products</button>
        </div>
        <div className="Category_Items">
          <button onClick={() => setSelectedCategory("men's clothing")}>Men</button>
        </div>
        <div className="Category_Items">
          <button onClick={() => setSelectedCategory("women's clothing")}>Women</button>
        </div>
        <div className="Category_Items">
          <button onClick={() => setSelectedCategory('electronics')}>Electronics</button>
        </div>
        <div className="Category_Items">
          <button onClick={() => setSelectedCategory('jewelery')}>Jewelry</button>
        </div>
      </div>

      <input type="text" name="search"  placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)}  />
      <button onClick={() => setSearchTerm('')}>Clear</button>

      <div className="Container">
        <div className="Row">
          {currentProducts.map((product) => (
            <div className="column" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <Products title={product.title} image={product.image} price={product.price} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="Pagination">
        {filteredProducts.length > productsPerPage && (
          <ul className="PaginationList">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryComponent;