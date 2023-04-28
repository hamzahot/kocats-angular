import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Cat } from "src/app/models/cat.model";

@Component({
    selector : "app-cat-box",
    templateUrl : "./cat-box.component.html",
    styleUrls : ['./cat-box.component.css']
})
export class CatBoxComponent{

    @Input() fullWidthMode = false;
    @Input() cat : Cat | undefined;

    currentYear: number;

    constructor(private router : Router) {
        this.currentYear = new Date().getFullYear();
    }

    viewDetails(id : number){
        this.router.navigate(['/cat-profile', id]);
    }


    test(id:number){
        console.log(this.cat?.name);
    }

}