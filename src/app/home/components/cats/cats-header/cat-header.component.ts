import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector : "app-cat-header",
    templateUrl : "./cat-header.component.html",
    styleUrls : ["./cat-header.component.css"]
})
export class CatHeaderComponent{


    @Output() columnsCountChange = new EventEmitter<number>();


    sort = 'desc';
    itemsShowCount = 12;



    onSortUpdated(newSort : string){
        this.sort = newSort;
    }


    onItemsCountUpdated(count : number) : void{
        this.itemsShowCount = count;
    }

    onColumnsUpdated(colsNum : number) : void {
        this.columnsCountChange.emit(colsNum);
    }

}