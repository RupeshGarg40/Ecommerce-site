import { Component } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  authError: string = '';
  showLogin: boolean = true;
  constructor(private user: UserService, private product: ProductService) {}
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: signup) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Email or Passowrd is incorrect';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList = JSON.parse(data);

      cartDataList.forEach((product: product, index: any) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
