import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Cat } from "src/app/models/cat.model";
import { CatHomeService } from "src/app/services/cat.service";

const ROWS_HEIGHT : { [id:number] : number} = { 1:400 , 3:335 , 4:350 };


@Component({
    selector : "app-cat",
    templateUrl : "./cats.component.html",
    styleUrls : ['./cats.component.css']
})
export class CatComponent implements OnInit, OnDestroy{
    

    constructor( private catService : CatHomeService ){}
    

    cols = 3;

    rowHeight = ROWS_HEIGHT[this.cols];

    cats : Array<Cat> | undefined;
    catsSubscription : Subscription | undefined;

    

    ngOnInit(): void {
        this.getCats();
    }



    getCats() : void{
        this.catsSubscription = this.catService.getAll().subscribe(data => {
            this.cats = data;
        })
    }

    onColumnsCountChange(colsNumber : number) : void{
        this.cols = colsNumber;
        this.rowHeight = ROWS_HEIGHT[this.cols];
    }


    ngOnDestroy(): void {
        if (this.catsSubscription) {
            this.catsSubscription.unsubscribe();
          }
    }


}