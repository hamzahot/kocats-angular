import { Component , OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";
import { Subscription } from 'rxjs';


const ROWS_HEIGHT : { [id:number] : number} = { 1:400 , 3:335 , 4:350 };


@Component({
    selector : "app-product",
    templateUrl : "./product.component.html",
    styleUrls : ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{


    constructor(private cartService : CartService,
                private storeService : StoreService            
    ){}
    

    products: Array<Product> | undefined;
    productsSubscription: Subscription | undefined;
    cols = 3;
    rowHeight = ROWS_HEIGHT[this.cols];


    ngOnInit(): void {
        this.getProducts();
        this.cartService.getAll();
    }


    getProducts() : void{
        this.productsSubscription = this.storeService.getAllProducts().subscribe((data) =>{
            this.products = data;
        })
    }

    onColumnsCountChange(colsNumber : number) : void{
        this.cols = colsNumber;
        this.rowHeight = ROWS_HEIGHT[this.cols];
    }


    onAddToCart(product : Product) : void{
        this.cartService.addToCart({
            imageName : product.imageName,
            name : product.name,
            price : product.price,
            quantity : 1,
            id : product.id
        });
    }


    ngOnDestroy(): void {
        if (this.productsSubscription) {
            this.productsSubscription.unsubscribe();
          }
    }



}