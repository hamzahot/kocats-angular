import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ActionService } from "../services/action.service";

@Injectable({providedIn : 'root'})
export class ActionResolver implements Resolve<any>{
    

    constructor(private actionService : ActionService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.id;

        const actionDetails = this.actionService.getById(id).toPromise();
        return actionDetails;
    }

}