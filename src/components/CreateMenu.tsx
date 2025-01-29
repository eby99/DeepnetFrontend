import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

const CreateMenu: React.FC = () => {
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: 0 }]);
  };

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string | number) => {
    const updatedItems = [...menuItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setMenuItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const menuResponse = await axios.post('http://localhost:3000/api/menus', {
        name: menuName,
        description: menuDescription,
      });

      for (const item of menuItems) {
        await axios.post(`http://localhost:3000/api/menus/${menuResponse.data.id}/items`, item);
      }

      navigate('/');
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Menu</h1>
      <form onSubmit={handleSubmit}>
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
        <div>
          <h2 className="text-2xl mb-4">Menu Items</h2>
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                className="w-full mb-2 border rounded p-2"
                required
              />
              <textarea
                placeholder="Item Description"
                value={item.description}
                onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                className="w-full mb-2 border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="Item Price"
                value={item.price}
                onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value))}
                className="w-full border rounded p-2"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMenuItem}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Menu Item
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;