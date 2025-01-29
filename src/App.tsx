import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MenuListPage from './pages/MenuListPage';
import CreateMenuPage from './pages/CreateMenuPage';
import MenuDetailPage from './pages/MenuDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/menus" element={<MenuListPage />} />
            <Route path="/create-menu" element={<CreateMenuPage />} />
            <Route path="/menu/:menuId" element={<MenuDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;