import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector : "app-filters",
    templateUrl : "./filters.component.html",
    styleUrls : ['./filters.component.css']
})
export class FiltersComponent{


    @Output() showCategory = new EventEmitter<string>();

    categories = [{url : '/home/product' , description : "Our products"} ,
                  {url : '/home/cat' , description : "Our cats"},
                  {url : '/home/donation' , description : "Donations"}
                 ];





}