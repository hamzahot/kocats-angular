import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Token } from "./models/token.model";
import {tap} from "rxjs/operators"

@Injectable( {providedIn : 'root'} )
export class AuthService{

    constructor( private http : HttpClient ){
        this.initAuth();
    }


    isAuthenticated = new BehaviorSubject<boolean>(false);
    private userIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public userId$: Observable<number> = this.userIdSubject.asObservable();


    authenticate(credentials : any) : Observable<any>{

        const url_user = `${environment.baseApi}/user/get-id/` + credentials.username;
        this.http.get<number>(url_user, {headers : this.generateHeaders()}).subscribe(data => {
            this.userIdSubject.next(data);
        })

        const url = `${environment.baseApi}/authenticate/login`;
        return this.http.post<Token>(url , credentials, {headers : this.generateHeaders()} )
            .pipe(
                tap(responseData => {
                    const accessToken = responseData.accessToken;
                    localStorage.setItem('accessToken' , accessToken);
                    this.isAuthenticated.next(true);
                })
            )
    }

    private initAuth() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          this.isAuthenticated.next(true);
        }
      }



    logout(){
        
        localStorage.removeItem('accessToken');
        this.isAuthenticated.next(false);
    }



    private generateHeaders() : HttpHeaders{
        let headers = new HttpHeaders();
        headers.set('Content-Type' , 'application.json');

        return headers;
    }

}