import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout map-wrapper">
      <header>
        <h1>Warehouse Locator</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Admin Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Warehouse Locator</p>
      </footer>
    </div>
  );
};

export default Layout;
