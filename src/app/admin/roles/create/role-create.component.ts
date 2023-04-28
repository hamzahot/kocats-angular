import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../services/role.service";

@Component({
    selector : "app-role-create",
    templateUrl : "./role-create.component.html"
})
export class RoleCreateComponent implements OnInit{
    

    constructor(private roleService : RoleService){}
    
    roleCreateForm ?: FormGroup;


    ngOnInit(): void {
        this.initializeForm();
    }


    create(){
        const payload : any = this.roleCreateForm?.value;
        this.roleService.insert(payload).subscribe(data => {
            console.log("Succesfully created a new role!");
            this.roleCreateForm?.reset();
        }, error => console.log(error));
    }


    private initializeForm():void{
        this.roleCreateForm = new FormGroup({
            name : new FormControl(null, Validators.required),
            description : new FormControl(null, Validators.required)
        });
    }






}