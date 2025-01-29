import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';
import { Menu } from '../types';

const CreateMenuPage: React.FC = () => {
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMenu: Partial<Menu> = { name: menuName, description: menuDescription, items: [] };
    await menuService.createMenu(newMenu);
    navigate('/menus');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Menu</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block mb-2">Menu Name</label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Menu Description</label>
          <textarea
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default CreateMenuPage;