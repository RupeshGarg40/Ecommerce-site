import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: false,
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productMessage: undefined | string;
  productData: undefined | product;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
      });
  }
  submit(data: product) {
    console.log(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product updated successfully';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
