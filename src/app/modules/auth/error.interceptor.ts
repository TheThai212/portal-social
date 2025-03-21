import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                this.auth.logout();
                location.reload();
            }
            const error = err.status.error || err.statusText;
            return throwError(error);
        }))
    }
}
