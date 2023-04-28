import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";

@Component({
    selector : "app-product-preview",
    templateUrl : "./product-preview.component.html"
})
export class ProductPreviewComponent implements OnInit{


    constructor( private productService : ProductService,  
                 private router : Router
                ){}


    products : any[] = [];


    ngOnInit(): void {
        this.preview();
    }



    preview(){
        this.productService.getAll().subscribe(data => {
            this.products = data;
        } , error => console.log(error));
    }


    deleteProduct(id : number){
        this.productService.deleteById(id).subscribe(data => {
            this.preview();
        } , error => console.log(error));
    }


    sendProductId(name : string, id : number){
        this.productService.pushProduct(id, name);
        this.router.navigate(['admin/product/addPhoto']);
    }




}