import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CatService } from "../services/cat.service";
import { RaceService } from "../services/race.service";

@Component({
    selector : "app-cat-edit",
    templateUrl : "./cat-edit.component.html"
})
export class CatEditComponent implements OnInit{


breeds : any[] = [];

constructor(private activatedRoute : ActivatedRoute,
            private catService : CatService,
            private raceService : RaceService,
            private router : Router
    ){}
    
    
ngOnInit(): void {
    this.getBreeds();
    const cat = this.activatedRoute.snapshot.data.catDetails;
    this.initializeForm(cat);
}


catEditForm ?: FormGroup;


updateCat(){
    const payload = this.catEditForm?.value;
    payload.catId = this.activatedRoute.snapshot.data.catDetails.catId;

    this.catService.update(payload).subscribe(data=> {
        this.router.navigate(['/admin/cat/preview']);
    } , error => console.log(error));
    
}

private getBreeds(){
    this.raceService.getAll().subscribe(data => {
        this.breeds = data;
    },error => console.log(error));
}


private initializeForm(cat : any):void{
    this.catEditForm = new FormGroup({
        name : new FormControl(cat.name, Validators.required),
        breeds : new FormControl(cat.breeds, Validators.required)
    });
}

}