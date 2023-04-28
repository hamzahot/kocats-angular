import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";

@Component({
    selector : "app-product-edit",
    templateUrl : "./product-edit.component.html"
})
export class ProductEditComponent implements OnInit{
    

    constructor(private activatedRoute : ActivatedRoute,
                private productService : ProductService ,
                private router : Router       
        ){}



    productEditForm ?: FormGroup;
    
    
    ngOnInit(): void {
        const product = this.activatedRoute.snapshot.data.productDetails;
        this.initializeForm(product);
    }


    updateProduct(){
        const payload = this.productEditForm?.value;
        const id = this.activatedRoute.snapshot.data.productDetails.id;
        this.productService.update(payload, id).subscribe(data => {
            this.router.navigate(['/admin/product/preview']);
        } , error => console.log(error));
    }



    private initializeForm(product : any):void{
        this.productEditForm = new FormGroup({
            name : new FormControl(product.name , Validators.required),
            description : new FormControl(product.description , Validators.required),
            price : new FormControl(product.price , Validators.required)
        });
    }






}