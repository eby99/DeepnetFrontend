import axios from 'axios';
import { Menu, MenuItem } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const menuService = {
  async getAllMenus(): Promise<Menu[]> {
    const response = await axios.get(`${API_BASE_URL}/menus`);
    return response.data;
  },

  async getMenuById(menuId: string): Promise<Menu> {
    const response = await axios.get(`${API_BASE_URL}/menus/${menuId}`);
    return response.data;
  },

  async createMenu(menuData: Partial<Menu>): Promise<Menu> {
    const response = await axios.post(`${API_BASE_URL}/menus`, menuData);
    return response.data;
  },

  async createMenuItem(menuId: string, itemData: Partial<MenuItem>): Promise<MenuItem> {
    const response = await axios.post(`${API_BASE_URL}/menus/${menuId}/items`, itemData);
    return response.data;
  }
};