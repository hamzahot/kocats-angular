import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CatService } from "../services/cat.service";
import { PhotoService } from "../services/photo.service";

@Component({
    selector : "app-cat-preview", 
    templateUrl : "./cat-preview.component.html"
})
export class CatPreviewComponent implements OnInit{

    
    cats : any[] = [];

    constructor( private catService : CatService,
                 private photoService : PhotoService,
                 private router : Router
        ){}
    
    ngOnInit(): void {
        this.previewAll();
    }


    deleteById(id : number) : void {
        this.catService.deleteById(id).subscribe(() => {
            this.previewAll();
          }, (error):any => {
            console.log('Error while deleting user...');
          });
        }
        


    previewAll():void{
        this.catService.getAll().subscribe(data => {
            this.cats = data;
        }, error => console.log(error));
    }


    sendCatId(name : string, id : number){
        this.photoService.pushCatId({"catId" : id, "name" : name});
        this.router.navigate(['/photo']);
    }


    


}