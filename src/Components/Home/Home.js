import React from "react";
import "./Home.css";
import Footer from '../Footer/Footer';
import Product from '../Pages/ProductCard';
import Carousel from "./HomeCarousel";

const Home = () => {
  return (
    <div className="home_container">
      
      <Carousel />
      <Product/>
      <Footer />
    </div>
  );
};

export default Home;