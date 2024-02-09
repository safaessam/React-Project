import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const NavBar = () => {
  const state = useSelector((state) => state.handleCart);
  
  return (
    <header>
      <div className="nav_container">
        <Link to="/">
          <div className="nav_logo">Sofia Store</div>
        </Link>
        <div className="nav_items">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/regist">
            <div>Register</div>
          </Link>
          <Link to="/login">
            <div>Login</div>
          </Link>
        </div>
        <div className="nav_btn">
          
          <Link to="/AboutUS">
            <div>
              <i class="uil uil-user"></i>About Us
            </div>
          </Link>
          <Link to="/cart">
            <div>
              <i class="uil uil-shopping-bag"></i>Cart ({state.length})
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;