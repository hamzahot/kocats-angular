import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap, delay } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn : 'root'})
export class CartService{

    cart = new BehaviorSubject<Cart>({items : []})
    isInCart = false;
    testData : Array<CartItem> = [];
    private userId ?: number;

    

    constructor(private _snackBar : MatSnackBar,
                private http : HttpClient,
                private authService : AuthService) {
                    this.authService.userId$.subscribe(data => {
                        this.userId = data;
                    })
                }

    
    
    


    getAll() : void{
        this.testData = [];
        const url = `${environment.baseApi}/cartItem/cart/` + this.userId;
        this.http.get<any[]>(url, {headers : this.generateHeaders()})
        .pipe(
            
            map(response => {
                response.forEach(item => {
                    if(item.serviceTypeDTO.category === 'product'){
                        this.testData.push({id : item.serviceTypeDTO.serviceTypeId,
                            imageName : item.imageName , name: item.name, 
                            price : item.price, quantity : item.quantity});
                    }
                    else if(item.serviceTypeDTO.category === 'action'){
                        this.testData.push({id : item.serviceTypeDTO.serviceTypeId,
                            imageName : item.imageName , name: item.name, 
                            price : item.price, quantity : 1, isAction : true, catId : item.catDTO.catId });
                    }
                    
                })
            } )
            
          )
          .subscribe();
            
          this.cart.next({items : this.testData});
    }

    
    


    addToCart(item : CartItem) : void{
        
        const items = [...this.cart.value.items];

        const itemInCart = items.find((_item) => _item.id === item.id);

        if(itemInCart && !item.isAction){
            const url = `${environment.baseApi}/cartItem/add-quantity/` + this.userId + '/' + itemInCart.id;
            this.http.put(url, null, {headers : this.generateHeaders()}).subscribe();
            itemInCart.quantity +=1;
        }
        
        else{

            const url = `${environment.baseApi}/cartItem`;
            const payload = { "price":item.price, "quantity" : item.quantity, "serviceTypeId" : item.id, "cartId" : this.userId};
            this.http.post<any>( url, payload, {headers : this.generateHeaders()} ).subscribe();

            items.push(item);
        }

        this.cart.next({items});
        this._snackBar.open('1 item added to cart.' , 'OK' , {duration : 3000});
    }

    addActionToCart(item : CartItem) : void{
        const items = [...this.cart.value.items];

        const itemInCart = items.find((_item) => _item.id === item.id && _item.catId == item.catId);

        if(itemInCart && itemInCart.name == item.name && item.isAction){
            this._snackBar.open("You already added this item." , "OK" , {duration : 3000});
            return;
        }

        const url = `${environment.baseApi}/cartItem`;
        const payload = { "catId" : item.catId , "name" : item.name , "price":item.price,
                          "quantity" : item.quantity, "serviceTypeId" : item.id,
                           "cartId" : this.userId, "imageName" : item.imageName};
        this.http.post<any>( url, payload, {headers : this.generateHeaders()} ).subscribe();

        items.push(item);

        this.cart.next({items});
        this._snackBar.open('1 item added to cart.' , 'OK' , {duration : 3000});
    }


    getTotal(items : Array<CartItem> ) : number{
        return items.
            map((item) => item.price*item.quantity)
            .reduce((prev, current) => prev + current , 0 );

    }



    clearCart() : void{
        const url = `${environment.baseApi}/cartItem/cart/` + this.userId;
        this.http.delete<any>(url, {headers : this.generateHeaders()}).subscribe(
            
          );
        this.cart.next({items : []});
        this._snackBar.open('Cart is cleared' , 'OK' , {duration : 3000});
    }

    

    removeFromCart(item : CartItem, update=true) : Array<CartItem>{

        if(item.isAction){
            const filteredItems = this.cart.value.items.filter(
                (_item) => (!(_item.id === item.id && _item.catId === item.catId))
            );
            const url = `${environment.baseApi}/cartItem/`+this.userId + '/' + item.id + '/' + item.catId;
            this.http.delete<any>(url, {headers : this.generateHeaders()}).subscribe();
            this.cart.next({items : filteredItems});
            this._snackBar.open('1 item removed from cart.' , 'OK' , {duration : 3000});
            return filteredItems;
        }

        else{
        const filteredItems = this.cart.value.items.filter(
            (_item) => _item.id !== item.id
        );
        const url = `${environment.baseApi}/cartItem/`+this.userId + '/' + item.id;
        this.http.delete<any>(url, {headers : this.generateHeaders()}).subscribe();
        if(update){
            this.cart.next({items : filteredItems});
            this._snackBar.open('1 item removed from cart.' , 'OK' , {duration : 3000});
        }
        return filteredItems;
        }
        
    }



   

    reduceQuantity(item : CartItem) : void{

        let itemForRemoval : CartItem | undefined;

        let filteredItems = this.cart.value.items.map((_item) =>{
            if(_item.id === item.id){
                _item.quantity --;
                if(_item.quantity ===0){
                    itemForRemoval = _item;
                }
            }

            return _item;
        })
        if(itemForRemoval){
            filteredItems = this.removeFromCart(itemForRemoval, false);
        }else{
            const url = `${environment.baseApi}/cartItem/reduce-quantity/` + this.userId + '/' + item.id;
            this.http.put(url , null , {headers : this.generateHeaders()}).subscribe();
        }

        this.cart.next({items : filteredItems});
        this._snackBar.open('1 item removed from cart' , 'OK' ,{duration : 3000} );

    }


    


    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }
}