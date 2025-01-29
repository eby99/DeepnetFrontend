import React from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

const MenuItem = ({ item }: { item: MenuItem }) => {
  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default MenuItem;