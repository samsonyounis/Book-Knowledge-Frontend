import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartItem } from '../interfaces/ItCartItem';

@Component({
  selector: 'app-shoppingcart',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {

  constructor(private router:Router){}
  // cartItems:CartItem[]=[];

  discount=0;
  finalAmount=0;
  cartItems = [
    { productName: 'Product 1', price: 100, quantity: 1 ,image:'html.JPG'},
    { productName: 'Product 2', price: 150, quantity: 1, image:'css.JPG' },
    { productName: 'Product 3', price: 200, quantity: 1, image: 'js.JPG' }
  ];

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  clearCart() {
    this.cartItems = [];
  }

  calculateTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  decreaseQuantity(item: CartItem){

  }
  increaseQuantity(item:CartItem){

  }
  navigateToCheckout(){
    this.router.navigateByUrl("/checkout");
  }

}
