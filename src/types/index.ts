export interface Menu {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
  }