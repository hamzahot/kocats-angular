import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../admin/roles/services/role.service";
import { UserService } from "../admin/users/services/user.service";
import { UserValidator } from "../admin/users/validators/user.validator";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector : "app-register",
    templateUrl : "./register.component.html"
})
export class RegisterComponent implements OnInit{


    constructor( private roleService : RoleService,
                 private userService : UserService,
                 private snackBar : MatSnackBar  
        ){}

    //roles : any[] = [];

    ngOnInit(): void {
        //this.getRolles();
        this.initializeForm();
        
    }


    registerUserForm?: FormGroup;

    private initializeForm():void{
        this.registerUserForm = new FormGroup({
            firstName : new FormControl(null, Validators.required),
            lastName : new FormControl(null, Validators.required),
            username : new FormControl(null, Validators.required , UserValidator.doesUsernameExist(this.userService)),
            password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
            email : new FormControl(null, [Validators.required , this.validateEmail.bind(this)]),
            phoneNumber : new FormControl(null),
           // roles : new FormControl(null, Validators.required)
        });
    }


    // private getRolles(){
    //     this.roleService.all().subscribe(data => {
    //         this.roles = data;
    //     },
    //         error => {
    //             console.log(error);
    //         });
    // }


    register(){
        const payload = this.registerUserForm?.value;
        payload.roles = [];
        this.userService.register(payload).subscribe(data => {
            console.log("User saved");
            this.snackBar.open("User successfully registered." , "OK" , {duration : 3000});
            this.registerUserForm?.reset();
        },
        error => {
            console.log(this.registerUserForm);
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


     //     const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     this.b = expression.test(email);
    //     console.log(this.b);



    // private validateLastName(control: FormControl) {
    //     const lastName = control.value;
    //     if (lastName === 'Muratovic') {
    //       return {
    //         lastNameValidationStatus: 'INVALID'
    //       };
    //     }
    //     return null;
    //   }
    // }



}