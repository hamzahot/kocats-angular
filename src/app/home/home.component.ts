import { Component, OnInit } from "@angular/core";
import { ColumnsCountChangeService } from "./services/columnsCount.service";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";

@Component({
    selector : "app-home",
    templateUrl : "./home.component.html",
    styleUrls : ['./home.component.css']
})
export class HomeComponent implements OnInit{


    constructor(private authService : AuthService){}

    userId$: Observable<number> | undefined;


    ngOnInit(): void {
        this.authService.userId$.subscribe(data => {
            this.userId$ = this.authService.userId$;
        });
    }
    

    // constructor(private columnsCountService : ColumnsCountChangeService){}

    // cols = 3;




    // onColumnsCountChange(colsNumber : number) : void{
    //     this.cols = colsNumber;
    // }
}
