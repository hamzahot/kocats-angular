import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Cart, CartItem } from "../models/cart.model";
import { CartService } from "../services/cart.service";

@Component({
    selector : 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls : ['./navbar.component.css']
    
})
export class NavbarComponent implements OnInit{


    private _cart : Cart = { items : [] };
    itemsQuantity ?: number ;

    @Input()
    get cart() : Cart{
        this.itemsQuantity  = this.cartService.cart.getValue().items.map((item) => item.quantity)
        .reduce((prev, current) => prev+current , 0);
        return this._cart;
    }

    set cart(cart : Cart){
        this._cart = cart;

        this.itemsQuantity = cart.items
            .map((item) => item.quantity)
            .reduce((prev, current) => prev+current , 0);
    }

    displayMobileView: boolean = false;
    isUserAuthenticated : boolean = false;

    constructor( private authService : AuthService,
        private router : Router, 
        private cartService : CartService ){
        }


    ngOnInit(): void {
        this.authService.isAuthenticated.subscribe(data => {
            this.isUserAuthenticated = data;
        });

    }

    

    links:any[] = [
        {name : "Home" , url : "/home"},
        {name : "About Us" , url : "/about-us"},
        {name : "Contact" , url : "/contact"},
        {name : "Playground" , url : "/playground"}
        ]


    toogleMobileView(){
        this.displayMobileView = !this.displayMobileView;
    }


    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }


    getTotal(items : Array<CartItem>) : number {
        return this.cartService.getTotal(items);
    }

    // numberOfItems() : number{
    //     return this.cartService.numberOfItems();
    // }

    onClearCart() : void{
        this.cartService.clearCart();
    }


}