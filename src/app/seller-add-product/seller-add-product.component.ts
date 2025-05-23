import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private productService: ProductService) {}
  addProducts(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is succesfully added.';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
