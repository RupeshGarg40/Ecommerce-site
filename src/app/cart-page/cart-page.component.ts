import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    totalAmount: 0,
  };
  constructor(private product: ProductService, private router: Router) {}
  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 20;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 49;
      this.priceSummary.totalAmount = price + price / 10 + 49 - price / 20;
      console.log(this.priceSummary);
    });
  }
  checkOut() {
    this.router.navigate(['/check-out']);
  }
}
