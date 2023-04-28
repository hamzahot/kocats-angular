import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CatService } from "../services/cat.service";

@Injectable({providedIn : 'root'})
export class CatResolver implements Resolve<any>{
    


    constructor(private catService : CatService){}
    
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const catId = route.params.id;
        const catDetails = this.catService.getById(catId).toPromise();
        return catDetails;
    }




}