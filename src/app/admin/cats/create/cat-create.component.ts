import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CatService } from "../services/cat.service";
import { RaceService } from "../services/race.service";

@Component({
    selector : "app-cat-create",
    templateUrl : "./cat-create.component.html"
})
export class CatCreateComponent implements OnInit{


    constructor(private catService : CatService,
                private raceService : RaceService        
        ) {
        
    }

    breeds : any[] = [];



    ngOnInit(): void {
        this.getBreeds();
        this.initializeForm();
    }


    createCatForm ?: FormGroup;



    private getBreeds(){
        this.raceService.getAll().subscribe(data => {
            this.breeds = data;
        },error => console.log(error));
    }


    private initializeForm():void{
        this.createCatForm = new FormGroup({
            name : new FormControl(null, Validators.required),
            breeds : new FormControl(null, Validators.required),
            gender: new FormControl(null, Validators.required),
            yearBorn : new FormControl(null, Validators.required)
        });
    }




    create(){
        const payload = this.createCatForm?.value;
        console.log(payload);
        this.catService.save(payload).subscribe(data => {
            console.log("Succesfully saved the cat!");
            this.createCatForm?.reset();
        }, error => console.log(error));
    }

}