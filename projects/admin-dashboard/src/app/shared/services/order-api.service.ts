import {Injectable} from '@angular/core';
import {Order, OrderItem, SOURCE, STATUS} from '../models/public-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class OrderApiService extends ApiService {

  readonly #orders: Order[];

  constructor(private httpClient: HttpClient) {
    super();
    this.#orders = this.initOrders();
  }

  getAllColiveryOrders(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}order/own`, { headers: super.createApiHeader() });
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
      items: [{description: 'Brot'}, {description: 'Bananen'}],
      source: 'APP',
      status: 'TO_BE_DELIVERED',
      updatedAt: '2020-09-06 08:00:00'
    });
    orders.push({
      createdAt: '2020-09-05 07:30:00',
      hint: 'Hint',
      id: '27818312-db48-4b1d-a305-6f43bb1e9b6a',
      maxPrice: 4.78,
      userId: 2,
      items: [{description: 'Müsli'}, {description: 'Äpfel'}, {description: 'Pflanzendrink'}],
      source: 'HOTLINE',
      status: 'ACCEPTED',
      updatedAt: '2020-09-06 10:30:00'
    });

    return orders;
  }

}
