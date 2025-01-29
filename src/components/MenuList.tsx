import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '../services/api';
import { Menu } from '../types/types';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const fetchedMenus = await menuService.getAllMenus();
        setMenus(fetchedMenus);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menus');
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <Link 
            key={menu.id} 
            to={`/menu/${menu.id}`} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{menu.name}</h2>
              <p className="text-gray-600">{menu.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuList;