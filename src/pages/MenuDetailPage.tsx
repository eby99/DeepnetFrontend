import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { menuService } from '../services/api';
import { Menu } from '../types';

const MenuDetailPage: React.FC = () => {
  const { menuId } = useParams<{ menuId: string }>();
  const [menu, setMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (menuId) {
        const fetchedMenu = await menuService.getMenuById(menuId);
        setMenu(fetchedMenu);
      }
    };
    fetchMenu();
  }, [menuId]);

  if (!menu) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
        <p className="text-gray-600 mb-6">{menu.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.items.map( item => (
            <div key={item.id} className="bg-gray-50 rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-bold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPage;