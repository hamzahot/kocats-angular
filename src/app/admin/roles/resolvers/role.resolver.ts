import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "../services/role.service";

@Injectable({providedIn : 'root'})
export class RoleResolver implements Resolve<any>{
   
    constructor(private roleService : RoleService){}
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roleId = route.params.id;

        const roleDetails = this.roleService.getById(roleId).toPromise();
        return roleDetails;
    }

}