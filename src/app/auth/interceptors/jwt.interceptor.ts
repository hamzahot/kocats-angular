import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isUserAuthenticated = this.authService.isAuthenticated.getValue(); // true | false
    const isAuthRequest = req.url.startsWith('/api/authenticate/'); // http://localhost/api/authenticate/login

    if (isUserAuthenticated && !isAuthRequest) {
      req = req.clone({
        
        setHeaders: {
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
    }
    return next.handle(req);
  }

}