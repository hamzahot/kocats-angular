import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../services/product.service";

@Component({
    selector : "app-product-photo",
    templateUrl : "./product-photo.component.html"
})
export class ProductPhotoComponent implements OnInit{


    id ?: number;
    name ?: string;

    photoProductPhotoForm ?: FormGroup;
    @ViewChild("fileName") fileNameSpan!:ElementRef;

    constructor(private productService : ProductService){}


    ngOnInit(): void {
        this.productService.productSubject.subscribe((data=>{
            this.id = data.id;
            this.name = data.name;
        }));
        this.initializeForm();
        
    }



    private initializeForm(){
        this.photoProductPhotoForm = new FormGroup({
            file: new FormControl(null)
        });
    }


    onFileSelected(element : any) : void{
        const files = element.target.files;
        
        if(files){
            const file = files[0];
            this.photoProductPhotoForm?.get('file')?.setValue(file);
            this.fileNameSpan.nativeElement.innerText = file.name ;
        }
    }


    upload(){
        let formData = new FormData();
        formData.append('photo' , this.photoProductPhotoForm?.get('file')!.value);
        this.productService.uploadPhoto(formData, this.id || 0).subscribe(response => {
            const status = response.status;
            const body = response.body;

            if(status === 201){
                console.log("Success!");
            }
            
        });
    }


}