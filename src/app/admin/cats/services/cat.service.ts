import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn : 'root' })
export class CatService{


    constructor( private http : HttpClient ){}


    getAll() : Observable<any>{
        const url = `${environment.baseApi}/cat`;
        return this.http.get<any>(url , {headers : this.generateHeaders() });
    }

    getById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/cat/` + id;
        return this.http.get<any>(url, {headers : this.generateHeaders()});
    }


    deleteById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/cat/` + id;
        return this.http.delete<any>(url, {headers : this.generateHeaders()});
    }


    save(payload : any) : Observable<any>{
        const url = `${environment.baseApi}/cat`;
        return this.http.post<any>(url, payload , {headers : this.generateHeaders()} );
    }


    update(payload : any) : Observable<any>{
        const url = `${environment.baseApi}/cat`;
        return this.http.put(url , payload, {headers : this.generateHeaders()});
    }



    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }

}