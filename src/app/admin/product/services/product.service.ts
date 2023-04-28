import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class ProductService{


    productSubject = new BehaviorSubject<{id : number, name : string}>({"id" : -1, "name" : ""});


    constructor( private http : HttpClient ){
    }


    pushProduct(id: number, name : string){
        this.productSubject.next({id, name});
    }


    uploadPhoto(payload : FormData, id : number) : Observable<any>{
        const url = `${environment.baseApi}/product/addPhoto/` + id;
        return this.http.put<any>(url , payload , {observe : 'response'})
    }



    getAll() : Observable<any>{
        const url = `${environment.baseApi}/product`;
        return this.http.get<any>(url , {headers : this.generateHeaders()})
    }


    insert(payload : any) : Observable<any>{
        const url = `${environment.baseApi}/product`;
        return this.http.post<any>(url, payload , {headers : this.generateHeaders()} );
    }


    deleteById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/product/` + id;
        return this.http.delete<any>(url , {headers : this.generateHeaders()});
    }


    getById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/product/` + id;
        return this.http.get<any>(url , {headers : this.generateHeaders()});
    }


    update(payload : any, id : number) : Observable<any>{
        const url = `${environment.baseApi}/product/update/` + id;
        return this.http.put<any>(url , payload,  {headers : this.generateHeaders()});
    }




    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }


}