import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItemComponent from './MenuItem';

interface Menu {
  id: number;
  name: string;
  description: string;
}

interface MenuItemDetails {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Menu = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemDetails[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMenu, setUpdatedMenu] = useState<Menu>({
    id: 0,
    name: '',
    description: '',
  });
  const [isUpdatingMenuItem, setIsUpdatingMenuItem] = useState(false);
  const [updatedMenuItem, setUpdatedMenuItem] = useState<MenuItemDetails>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/menus')
      .then(response => {
        setMenus(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      axios.get(`http://localhost:3000/api/menus/${selectedMenu.id}/items`)
        .then(response => {
          setMenuItems(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedMenu]);

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu);
    setUpdatedMenu(menu);
  };

  const handleUpdateMenu = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/api/menus/${updatedMenu.id}`, updatedMenu)
      .then(response => {
        console.log(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteMenu = () => {
    axios.delete(`http://localhost:3000/api/menus/${selectedMenu?.id}`)
      .then(response => {
        console.log(response.data);
        setSelectedMenu(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteMenuItem = (itemId: number) => {
    axios.delete(`http://localhost:3000/api/menus/${selectedMenu?.id}/items/${itemId}`)
      .then(response => {
        console.log(response.data);
        setMenuItems(menuItems.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateMenuItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/api/menus/${selectedMenu?.id}/items/${updatedMenuItem.id}`, updatedMenuItem)
      .then(response => {
        console.log(response.data);
        setIsUpdatingMenuItem(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>
            <a href="#" onClick={() => handleMenuClick(menu)}>
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
      {selectedMenu && (
        <div className="menu-items">
          <h2>{selectedMenu.name}</h2>
          <p>{selectedMenu.description}</p>
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <MenuItemComponent item={item} />
                <button onClick={() => handleDeleteMenuItem(item.id)}>Delete Menu Item</button>
                <button onClick={() => {
                  setIsUpdatingMenuItem(true);
                  setUpdatedMenuItem(item);
                }}>Update Menu Item</button>
                {isUpdatingMenuItem && updatedMenuItem.id === item.id ? (
                  <form onSubmit={handleUpdateMenuItem}>
                    <label>
                      Name:
                      <input type="text" value={updatedMenuItem.name} onChange={event => setUpdatedMenuItem({ ...updatedMenuItem, name: event.target.value })} />
                    </label>
                    <label>
                      Description:
                      <textarea value={updatedMenuItem.description} onChange={event => setUpdatedMenuItem({ ...updatedMenuItem, description: event.target.value })} />
                    </label>
                    <label>
                      Price:
                      <input type="number" value={updatedMenuItem.price} onChange={event => setUpdatedMenuItem({ ...updatedMenuItem, price: event.target.valueAsNumber })} />
                    </label>
                    <button type="submit">Update Menu Item</button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
          {isEditing ? (
            <form onSubmit={handleUpdateMenu}>
              <label>
                Name:
                <input type="text" value={updatedMenu.name} onChange={event => setUpdatedMenu({ ...updatedMenu, name: event.target.value })} />
              </label>
              <label>
                Description:
                <textarea value={updatedMenu.description} onChange={event => setUpdatedMenu({ ...updatedMenu, description: event.target.value })} />
              </label>
              <button type="submit">Update Menu</button>
            </form>
          ) : (
            <div>
              <button onClick={() => setIsEditing(true)}>Edit Menu</button>
              <button onClick={handleDeleteMenu}>Delete Menu</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;