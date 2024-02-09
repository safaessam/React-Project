import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios'; 
import Navbar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import SingleProduct from './Components/Pages/SingleProduct';
import Cart from './Components/Pages/Cart';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Registration';
import AboutUS from './Components/Pages/AboutUS';




axios.defaults.baseURL = 'https://fakestoreapi.com/products';

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/regist" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AboutUS" element={<AboutUS />} />

          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;