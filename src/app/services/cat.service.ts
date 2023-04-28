import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cat } from "../models/cat.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn : 'root'})
export class CatHomeService{


    constructor( private http : HttpClient ){}


    getAll() : Observable<Array<Cat>>{
        const url = `${environment.baseApi}/cat`;
        return this.http.get<any>(url , {headers : this.generateHeaders() });
    }


    getById(id : number) : Observable<Cat>{
        const url = `${environment.baseApi}/cat/` + id;
        return this.http.get<Cat>(url, {headers : this.generateHeaders()});
    }

    

    


    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }


}