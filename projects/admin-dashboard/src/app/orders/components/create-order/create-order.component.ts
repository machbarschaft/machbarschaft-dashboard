import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { OrderApiService } from '../../../shared/services/backend/order-api.service';
import {Order, OrderItem} from '../../../shared/models/order.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';

@Component({
  selector: 'mbs-ad-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateOrderComponent {

  items: OrderItem[];
  item: string;
  orderGroupForm = new FormGroup({
    hint: new FormControl(''),
    maxPrice: new FormControl(0),
    user: new FormControl(null, Validators.required),
    item: new FormControl('')
  });

  constructor(private orderApiService: OrderApiService,
              public breakpointObserver: BreakPointObserverService) {
    this.items = [];
    this.item = '';
  }

  onSubmit(): void {
    if (this.orderGroupForm.valid) {
      const order: Order = {
        createdAt: new Date().toDateString(),
        hint: this.orderGroupForm.get('hint').value,
        id: this.createUUID(),
        maxPrice: this.orderGroupForm.get('maxPrice').value,
        userId: this.orderGroupForm.get('user').value,
        items: this.items,
        source: 'APP',
        status: 'TO_BE_DELIVERED',
        updatedAt: new Date().toDateString(),
      };

      this.orderApiService.createOrder(order);
      this.items = [];
      this.item = '';
      this.orderGroupForm.reset({
        hint: '',
        maxPrice: 0,
        user: 0,
        item: ''
      });
      console.log('order angelegt', order);
    }
  }

  addItem(): void {
    const description = this.orderGroupForm.get('item').value;
    if (description) {
      const value = {
        hint: this.orderGroupForm.get('hint').value,
        maxPrice: this.orderGroupForm.get('maxPrice').value,
        user: this.orderGroupForm.get('user').value,
        item: ''
      };
      this.items.push({description});
      this.orderGroupForm.setValue(value);
    }
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  private createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

