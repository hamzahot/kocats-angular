import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProductService } from "../services/product.service";

@Injectable({providedIn : 'root'})
export class ProductResolver implements Resolve<any>{
    
    constructor(private productService : ProductService){}

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.id;
        const productDetails = this.productService.getById(id).toPromise();
        return productDetails;
    }

}