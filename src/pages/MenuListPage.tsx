import React, { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import { menuService } from '../services/api';
import { Menu } from '../types';

const MenuListPage: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const fetchedMenus = await menuService.getAllMenus();
      setMenus(fetchedMenus);
    };
    fetchMenus();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Menus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map(menu => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default MenuListPage;