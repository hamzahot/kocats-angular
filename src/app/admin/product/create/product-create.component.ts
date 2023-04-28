import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../services/product.service";

@Component({
    selector :  "app-product-create",
    templateUrl : "./product-create.component.html"
})
export class ProductCreateComponent implements OnInit{

    
    constructor(private productService : ProductService){}

    productCreateForm ?: FormGroup;


    ngOnInit(): void {
        this.initializeForm();
    }


    create(){
        const payload : any = this.productCreateForm?.value;
        this.productService.insert(payload).subscribe(data => {
            console.log("Succesfully created a new product!");
            this.productCreateForm?.reset();
        }, error => console.log(error));
    }



    private initializeForm():void{
        this.productCreateForm = new FormGroup({
            name : new FormControl(null, Validators.required),
            description : new FormControl(null, Validators.required),
            price : new FormControl(null, Validators.required)
        });
    }



}