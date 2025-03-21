import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard {
    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getUserByToken();

        currentUser.subscribe(resp=> {
            if (resp) {
                return true;
            } else {
                console.log("LOGOUT");
                return false;
            }
        })
    }
}
