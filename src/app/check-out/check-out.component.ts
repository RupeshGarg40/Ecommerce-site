import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  standalone: false,
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  totalPrice: number | undefined;
  constructor(private product: ProductService, private router: Router) {}
  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 49 - price / 20;
      console.log(this.totalPrice);
    });
  }
  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      };
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.router.navigate(['/my-orders']);
        }
      });
    }
  }
}
