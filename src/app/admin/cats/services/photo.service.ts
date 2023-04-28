import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cat } from "../models/cat.model";

@Injectable({providedIn : 'root'})
export class PhotoService{


    catIdEmitter = new EventEmitter<Cat>();
    catIdSubject = new BehaviorSubject<Cat>({"catId" : -1, "name" : ""});


    constructor(private http : HttpClient){}



    upload(payload : FormData, id : number) : Observable<any>{
        const url = `${environment.baseApi}/cat-photo/upload/` + id;
        return this.http.post<any>(url , payload , {observe : 'response'})
    }


    pushCatId(cat : Cat){
       // this.catIdEmitter.emit(cat);
        this.catIdSubject.next(cat);
    }



}