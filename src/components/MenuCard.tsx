import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../types';

interface MenuCardProps {
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
  return (
    <Link 
      to={`/menu/${menu.id}`} 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {menu.name}
      </h2>
      <p className="text-gray-600">{menu.description}</p>
      <div className="mt-4 text-sm text-gray-500">
        {menu.items.length} Items
      </div>
    </Link>
  );
};

export default MenuCard;