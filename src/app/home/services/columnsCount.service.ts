import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn : 'root'})
export class ColumnsCountChangeService{


    private cols = new BehaviorSubject<number>(3);


    loadCols(c : number){
        this.cols.next(c);
    }


    getCols() : Observable<number>{
        return this.cols.asObservable();
    }


}