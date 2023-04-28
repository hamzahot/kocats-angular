import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
    selector : "app-user-preview",
    templateUrl : "./user-preview.component.html"
})
export class UserPreviewComponent implements OnInit{
    
    users : any[] = [];



    constructor( private userService : UserService ){}
    
    ngOnInit(): void {
        this.preview();
    }


    deleteUserById(userId: number) {
        this.userService.deleteById(userId).subscribe(() => {
          this.preview();

        }, (error):any => {
          console.log('Error while deleting user...');
        });
      }



      preview():void{
        this.userService.getAll().subscribe(data =>{
            console.log(data);
            this.users = data;
        }, error => {
            console.log(error);
        });
      }

}