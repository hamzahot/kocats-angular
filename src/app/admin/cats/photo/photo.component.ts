import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";

@Component({
    selector : "app-photo",
    templateUrl : "./photo.component.html"
})
export class PhotoComponent implements OnInit{
    
    
    constructor(private photoService : PhotoService,
                private router : Router
        ){}

    catId ?: number;

    catName ?: string;

    test ?: number;

    @ViewChild("fileName") fileNameSpan!:ElementRef;
    

    photoUploadForm ?: FormGroup;

    ngOnInit(): void {
        this.photoService.catIdSubject.subscribe(data => {
            this.catId = data.catId;
            this.catName = data.name;
        });
        this.initializeForm();
        
        
    }

    onFileSelected(element : any) : void{
        const files = element.target.files;
        
        if(files){
            const file = files[0];
            this.photoUploadForm?.get('file')?.setValue(file);
            this.fileNameSpan.nativeElement.innerText = file.name ;
        }
    }


    private initializeForm(){
        this.photoUploadForm = new FormGroup({
            file: new FormControl(null)
        });
    }

    upload(){
        let formData = new FormData();
        formData.append('photo' , this.photoUploadForm?.get('file')!.value);
        this.photoService.upload(formData, this.catId || 0).subscribe(response => {
            const status = response.status;
            const body = response.body;

            if(status === 201){
                console.log("Success!");
            }
            
        });
    }

}