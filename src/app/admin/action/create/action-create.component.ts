import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActionService } from "../services/action.service";

@Component({
    selector : "app-action-create",
    templateUrl : "./action-create.component.html"
})
export class ActionCreateComponent implements OnInit{
    

    constructor(private actionService : ActionService){}

    actionCreateForm ?: FormGroup;


    ngOnInit(): void {
        this.initializeForm();
    }


    create(){
        const payload = this.actionCreateForm?.value;
        this.actionService.insert(payload).subscribe(data => {
            console.log("Succesfullt created a new action!");
            this.actionCreateForm?.reset();
        } , error => console.log(error));
    }


    private initializeForm():void{
        this.actionCreateForm = new FormGroup({
            name : new FormControl(null, Validators.required),
            description : new FormControl(null, Validators.required),
            price : new FormControl(null, Validators.required)
        });
    }





}