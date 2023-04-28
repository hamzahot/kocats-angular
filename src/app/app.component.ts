import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'kocats';

  cart: Cart = { items : [] };
 
  constructor(private cartService : CartService){
    //this.cartService.getAll();
  }
  
  ngOnInit(): void {
        this.cartService.cart.subscribe((_cart : Cart) =>{
            this.cart = _cart;
        });
  }
}
