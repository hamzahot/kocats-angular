import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { RoleService } from "../services/role.service";

@Component({
    selector : "app-role-edit",
    templateUrl : "./role-edit.component.html"
})
export class RoleEditComponent implements OnInit{
   
   constructor(private activatedRoute : ActivatedRoute,
               private roleService : RoleService ,
               private router : Router           
    ){}
   
    roleEditForm ?: FormGroup;

   
    ngOnInit(): void {
        const role = this.activatedRoute.snapshot.data.roleDetails;
        this.initializeForm(role);
    }


    updateRole(){
        const payload = this.roleEditForm?.value;
        payload.roleId = this.activatedRoute.snapshot.data.roleDetails.roleId;
        this.roleService.update(payload).subscribe(data=>{
            this.router.navigate(['/admin/roles/preview']);
        }, error => console.log(error));
    }


    private initializeForm(role : any):void{
        this.roleEditForm = new FormGroup({
            name : new FormControl(role.name , Validators.required),
            description : new FormControl(role.description , Validators.required)
        });
    }

    

}