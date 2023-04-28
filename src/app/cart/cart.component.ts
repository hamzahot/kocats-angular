import { Component , OnInit} from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { CartService } from "../services/cart.service";

@Component({
    selector : "app-cart",
    templateUrl : "./cart.component.html",
    styleUrls : ["./cart.component.css"]
}) 
export class CartComponent implements OnInit{
    

    constructor(private cartService : CartService){}


    cart : Cart = {items : []};

    dataSource : Array<CartItem> = [];
    displayedColumns : Array<string> = [
        'product',
        'name',
        'price',
        'quantity',
        'total',
        'action'
    ];

    ngOnInit(): void {
        this.preview();
        console.log(this.dataSource);
    }



    getTotal(items : Array<CartItem> ) : number{
        return this.cartService.getTotal(items);

    }



    //DUMYY PODACIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    onClearCart() : void{
        //this.cartService.clearCart();
        this.cartService.clearCart();
    }


    onRemoveFromCart(item : CartItem) : void{
        this.cartService.removeFromCart(item);
        //this.cartService.test2(26).subscribe();
    }


    onAddQuantity(item : CartItem) : void{
        this.cartService.addToCart(item);
        //this.cartService.getAll();
    }

    onRemoveQuantity(item : CartItem) : void{
        this.cartService.reduceQuantity(item);
        //this.cartService.test3(24).subscribe();
    }


    private preview():void{
        this.cartService.getAll();
        this.cartService.cart.subscribe((_cart : Cart) =>{
            this.cart = _cart;
            this.dataSource = this.cart.items;

        });
    }

}