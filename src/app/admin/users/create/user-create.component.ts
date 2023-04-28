import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../../roles/services/role.service";
import { UserService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";

@Component({
    selector : "app-user-create",
    templateUrl : "./user-create.component.html"
})
export class UserCreateComponent implements OnInit{


    constructor( private roleService : RoleService,
        private userService : UserService        
){}

roles : any[] = [];

ngOnInit(): void {
this.getRolles();
this.initializeForm();

}


createUserForm?: FormGroup;

private initializeForm():void{
this.createUserForm = new FormGroup({
   firstName : new FormControl(null, Validators.required),
   lastName : new FormControl(null, Validators.required),
   username : new FormControl(null, Validators.required , UserValidator.doesUsernameExist(this.userService)),
   password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
   email : new FormControl(null, [Validators.required , this.validateEmail.bind(this)]),
   phoneNumber : new FormControl(null),
   roles : new FormControl(null, Validators.required)
});
}


private getRolles(){
this.roleService.all().subscribe(data => {
   this.roles = data;
},
   error => {
       console.log(error);
   });
}


create(){
const payload = this.createUserForm?.value;
this.userService.register(payload).subscribe(data => {
   console.log("User saved");
   this.createUserForm?.reset();
},
error => {
   console.log(this.createUserForm);
});
}


validateEmail(control : FormControl){
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const email = control.value;
if(!expression.test(email)){
   return {
       emailValidationStatus : 'INVALID'
   };
}
return null;
}




}