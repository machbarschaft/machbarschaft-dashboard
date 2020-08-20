import {SOURCE, STATUS} from './public-api';

export interface Order {
  createdAt: string;
  hint: string;
  id: string;
  maxPrice: number;
  userId: number;
  items: OrderItem[];
  source: SOURCE;
  status: STATUS;
  updatedAt: string;
}

export interface OrderItem {
  description: string;
}

