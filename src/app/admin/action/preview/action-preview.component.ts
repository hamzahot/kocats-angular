import { Component, OnInit } from "@angular/core";
import { ActionService } from "../services/action.service";

@Component({
    selector : "app-action-preview",
    templateUrl : "./action-preview.component.html"
})
export class ActionPreviewComponent implements OnInit{
   
   constructor(private actionService : ActionService){}


    actions : any[] = [];

    ngOnInit(): void {
        this.preview();
    }


    preview():void{
        this.actionService.getAll().subscribe(data => {
            this.actions = data;
        }, error => console.log(error));
    }


    deleteAction(id : number){
        this.actionService.deleteById(id).subscribe(data => {
            console.log("Succesfully deleted an action");
            this.preview();
        } , error => console.log(error));
    }






}