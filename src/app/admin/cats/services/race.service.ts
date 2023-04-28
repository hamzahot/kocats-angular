import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn : 'root' })
export class RaceService{

    constructor(private http : HttpClient){}


    getAll() : Observable<any>{
        const url = `${environment.baseApi}/race`
        return this.http.get<any>(url , {headers : this.generateHeaders() })
    }


    getById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/race/` + id;
        return this.http.get<any>(url, {headers : this.generateHeaders()});
    }




    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }


}