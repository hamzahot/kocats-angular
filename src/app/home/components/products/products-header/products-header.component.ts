import { Component, Output, EventEmitter } from "@angular/core";
import { ColumnsCountChangeService } from "src/app/home/services/columnsCount.service";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";

@Component({
    selector : "app-products-header",
    templateUrl : "./products-header.component.html",
    styleUrls : ['./products-header.component.css']
})
export class ProductsHeaderComponent{


@Output() columnsCountChange = new EventEmitter<number>();

constructor(){}

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