import { Component, OnInit } from "@angular/core";
import { RoleService } from "../services/role.service";

@Component({
    selector : "app-role-preview",
    templateUrl : "./role-preview.component.html"
})
export class RolePreviewComponent implements OnInit{


    roles : any[] = [];


constructor( private roleService : RoleService ){
}


 ngOnInit(): void {
    this.preview();
}


deleteRole(id : number){
    this.roleService.deleteById(id).subscribe(data => {
        console.log("Succesfully deleted the role!");
        this.preview();
    } , error => console.log(error));
}



preview() : void{
    this.roleService.all().subscribe(data => {
        this.roles = data;
    } , error => console.log(error));
}

    
}