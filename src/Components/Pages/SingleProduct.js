import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/action';
import axios from 'axios';
import Footer from '../Footer/Footer';
import './SingleProduct.css';

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="Product-card">
        <div className="Product-Img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="Product-Details">
          <h2>{product.title}</h2>
          <p id="Product-description">{product.description}</p>
          <p id="Product-price">${product.price}</p>
          <button onClick={() => addProduct(product)}>Add To Cart</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;