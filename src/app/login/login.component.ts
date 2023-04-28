import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector : "app-login",
    templateUrl : "./login.component.html"
})
export class LoginComponent{

    constructor( private authService : AuthService,
                 private router : Router
        ){}


    er : number = 0;

    onLogin(loginForm : NgForm){
        const credentials = loginForm.value;
        this.authService.authenticate(credentials).subscribe(data => {
            this.er = 2;
            this.router.navigate(['/home'])
        }, error => {
            console.log("Incorrect password or username!");
            this.er = 1;
    })
    }

}