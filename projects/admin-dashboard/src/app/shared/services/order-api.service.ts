import {Injectable} from '@angular/core';
import {Order, OrderItem, SOURCE, STATUS} from '../models/public-api';

@Injectable({ providedIn: 'root' })
export class OrderApiService {

  #orders: Order[];

  constructor() {
    this.#orders = this.initOrders();
  }

  getAllOrders(): Order[] {
    return this.#orders;
  }

  getOrder(id: string): Order | null {
    return this.#orders.find(order => order.id === id);
  }

  private initOrders(): Order[] {
    const orders: Order[] = [];

    orders.push({
      createdAt: '2020-09-05 09:41:00',
      hint: 'Hint',
      id: '6862bdaa-e16c-477a-ba8b-900676be7939',
      maxPrice: 15.99,
      userId: 1,
      items: [{description: 'Brot'}, {description: 'Bananen' }],
      source: 'APP',
      status: 'TO_BE_DELIVERED',
      updatedAt: '2020-09-06 08:00:00'
    });

    return orders;
  }

}
