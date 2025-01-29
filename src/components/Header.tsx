import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Menu</a>
          </li>
          <li>
            <a href="#">Create Menu</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;