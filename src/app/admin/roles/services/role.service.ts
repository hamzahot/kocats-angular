import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class RoleService{


    constructor(private http : HttpClient){}



    all():Observable<any>{
        const url = `${environment.baseApi}/role`;
        return this.http.get<any>(url, {headers : this.genereateHeaders()});
    }


    insert(payload : any) : Observable<any>{
        const url = `${environment.baseApi}/role`;
        return this.http.post<any>(url , payload, {headers : this.genereateHeaders()});
    }


    deleteById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/role/` + id;
        return this.http.delete<any>(url, {headers : this.genereateHeaders()});
    }


    getById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/role/` + id;
        return this.http.get<any>(url, {headers : this.genereateHeaders()});
    }

    update(payload : any) : Observable<any>{
        const url = `${environment.baseApi}/role`;
        return this.http.put<any>(url, payload, {headers : this.genereateHeaders()});
    }


    private genereateHeaders():HttpHeaders{
        let headers = new HttpHeaders();
        headers.set('Content-Type' , 'application/json');

        return headers;
    }


}