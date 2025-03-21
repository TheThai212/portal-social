import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.has("Authorization")) {
            return next.handle(req);
        }

        const authToken: string | null = this.auth.getAuthFromLocalStorage();
        // const authToken: string | null = "Bearer 7|RbE1IAFoNW13m1j6QnSQl4mxjepBvBcw6aWRFbpH7d137a28";

        let authReq: HttpRequest<any> = req.clone({
           headers: req.headers
               .set("Authorization", `Bearer ${authToken}`)
               .set("Content-Type", "application/json")
        });

        if (req.headers.has("Content-Type")) {
            authReq = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${authToken}`)
            });
        }
        return next.handle(authReq);
    }
}
