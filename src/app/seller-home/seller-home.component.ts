import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  standalone: false,
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.List();
  }
  deleteProduct(id: number) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted!';
        this.List();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  List() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
