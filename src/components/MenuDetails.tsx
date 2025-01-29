import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Menu { id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

const MenuDetails: React.FC = () => {
  const { menuId } = useParams<{ menuId: string }>();
  const [menu, setMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/menus/${menuId}`);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu details:', error);
      }
    };

    fetchMenuDetails();
  }, [menuId]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
      <p className="mb-6">{menu.description}</p>
      <h2 className="text-2xl mb-4">Menu Items</h2>
      <ul>
        {menu.items.map((item) => (
          <li key={item.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-bold">${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDetails;