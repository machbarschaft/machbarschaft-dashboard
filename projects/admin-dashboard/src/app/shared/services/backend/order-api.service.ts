import {GeoPoint} from '../../models/geo.interface';
import {Injectable} from '@angular/core';
import {Order} from '../../models/public-api';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderApiService {

  readonly #orders: Order[];

  constructor(private httpClient: HttpClient) {
    this.#orders = this.initOrders();
  }

  getAllColiveryOrders(): Observable<any> {
    return this.httpClient.get(`v1/user/orders`);
  }

  getAllOrders(): Order[] {
    return this.#orders;
  }

  getOrdersInRange(geopoint: GeoPoint, range: number): Observable<any> {
    const params = new HttpParams().set('latitude', geopoint.latitude.toString());
    return this.httpClient.get(`v1/user/orders`,
      {
        params: new HttpParams()
          .set('latitude', geopoint.latitude.toString())
          .set('longitude', geopoint.longitude.toString())
          .set('range', range.toString()),
      });
  }

  crerateColiveryOrder(order: Order, credentials: string, details: string, principal: string): Observable<any> {
    return this.httpClient.post(`v1/user/orders`, order,
      {
        params: new HttpParams()
          .set('credentials', credentials)
          .set('details', details)
          .set('principal', principal),
      });
  }

  abortOrder(orderId: string): Observable<any> {
    return this.editOrder(orderId, 'abort');
  }
  acceptOrder(orderId: string): Observable<any> {
    return this.editOrder(orderId, 'accept');
  }
  cancelOrder(orderId: string): Observable<any> {
    return this.editOrder(orderId, 'cancel');
  }
  deliverOrder(orderId: string): Observable<any> {
    return this.editOrder(orderId, 'deliver');
  }

  editOrder(orderId: string, type: string): Observable<any> {
    return this.httpClient.patch(`v1/order/${orderId}/${type}`, null);
  }

  getOrder(id: string): Order | null {
    return this.#orders.find(order => order.id === id);
  }

  createOrder(order: Order): void {
    this.#orders.push(order);
  }

  private initOrders(): Order[] {
    const orders: Order[] = [];

    orders.push({
      createdAt: '2020-09-05 09:41:00',
      hint: 'Hint',
      id: '6862bdaa-e16c-477a-ba8b-900676be7939',
      maxPrice: 15.99,
      userId: 1,
      items: [{ description: 'Brot' }, { description: 'Bananen' }],
      source: 'APP',
      status: 'DELIVERED',
      updatedAt: '2020-09-06 08:00:00'
    });
    orders.push({
      createdAt: '2020-09-05 07:30:00',
      hint: 'Hint',
      id: '27818312-db48-4b1d-a305-6f43bb1e9b6a',
      maxPrice: 4.78,
      userId: 2,
      items: [{ description: 'Müsli' }, { description: 'Äpfel' }, { description: 'Pflanzendrink' }],
      source: 'HOTLINE',
      status: 'ACCEPTED',
      updatedAt: '2020-09-06 10:30:00'
    });

    return orders;
  }

}
