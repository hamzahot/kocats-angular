import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionService } from "../services/action.service";

@Component({
    selector : "app-action-edit",
    templateUrl : "./action-edit.component.html"
})
export class ActionEditComponent implements OnInit{
   

    actionEditForm ?: FormGroup;


    constructor(private activatedRoute : ActivatedRoute,
                private actionService : ActionService,
                private router : Router
        ){}
   
   
    ngOnInit(): void {
        const action = this.activatedRoute.snapshot.data.actionDetails;
        this.initializeForm(action);
    }


    updateAction(){
        const payload = this.actionEditForm?.value;
        payload.id = this.activatedRoute.snapshot.data.actionDetails.id;
        this.actionService.update(payload).subscribe(data => {
            this.router.navigate(['/admin/action/preview']);
        } , error => console.log(error));
    }



    private initializeForm(action : any):void{
        this.actionEditForm = new FormGroup({
            name : new FormControl(action.name , Validators.required),
            description : new FormControl(action.description , Validators.required),
            price : new FormControl(action.price , Validators.required)
        });
    }



}