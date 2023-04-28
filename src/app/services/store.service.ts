import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";


@Injectable({providedIn : 'root'})
export class StoreService{


    constructor(private http : HttpClient){}



    getAllProducts() : Observable<Array<Product>>{
        const url = `${environment.baseApi}/product`;
        return this.http.get<Array<Product>>(url , {headers : this.generateHeaders()})
    }






    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }


}