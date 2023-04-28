import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable({ providedIn : 'root' })
export class UserService{
   
    

    constructor(private http: HttpClient){}


    getAll() : Observable<any>{
        const url = `${environment.baseApi}/user/all`;
        return this.http.get(url , {headers : this.generateHeaders()})

    }

    deleteById(id : number) : Observable<any> {
        const url = `${environment.baseApi}/user/` + id;
        return this.http.delete<any>(url, {headers : this.generateHeaders()});
    }


    register(payload: any) : Observable<any>{
        const url = `${environment.baseApi}/authenticate/register`;
        return this.http.post<any>(url, payload, {headers : this.generateHeaders()})
    }



    existsByUsername(username : string) : Observable<any>{
        const url = `${environment.baseApi}/user/exists/by-username/${username}`;
        return this.http.get<any>(url, {headers : this.generateHeaders()});
    }


    getById(id : number) : Observable<any>{
        const url = `${environment.baseApi}/user/` + id;
        return this.http.get<any>(url , {headers : this.generateHeaders()});
    }


    update(id : number, payload : any) : Observable<any>{
        const url = `${environment.baseApi}/user/` + id;
        return this.http.put<any>(url , payload , {headers : this.generateHeaders()});
    }


    private generateHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
  
        return headers;
      }


    

}