import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../services/user.service";

export class UserValidator{

    static doesUsernameExist(userService : UserService) : AsyncValidatorFn{
        return (control : AbstractControl) : Observable<any> => {
            return userService.existsByUsername(control.value)
                .pipe(
                    map(responseData => {
                        if(responseData.userAlreadyExists){
                            return {
                                isUsernameTaken : true
                            }
                        }
                        return null;
                    })
                )
        }
    }

}