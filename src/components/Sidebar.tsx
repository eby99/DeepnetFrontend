import React from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../assets/icons/plus-icon.svg';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#1E1E1E] h-screen p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-white text-2xl font-bold">Menu Management</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/menus" 
              className="text-gray-400 hover:text-white flex items-center"
            >
              <span className="mr-2">Menus</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/create-menu" 
              className="text-gray-400 hover:text-white flex items-center"
            >
              <img src={PlusIcon} alt="Create" className="mr-2" />
              <span>Create Menu</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;