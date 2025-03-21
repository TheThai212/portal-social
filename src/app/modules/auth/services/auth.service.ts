import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, concatMap, EMPTY, from, Observable, of, Subscription, switchMap} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

export type UserType = UserModel | undefined;
declare const FB: any;

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private unsubscribe: Subscription[] = [];
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
    private authLocalStorageUser = `${environment.appVersion}-${environment.USERINFO_KEY}`;

    currentUser$: Observable<UserType>;
    isLoading$: Observable<boolean>;
    currentUserSubject: BehaviorSubject<UserType>;
    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }


    loginFB(accessToken: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/facebook/user-info`, {accessToken})
            .pipe(map(account => {
                    this.currentUserSubject.next(account.data.user);
                    this.setAuthFromLocalStorage(account.data);
                    this.setInfoFromLocalStorage(account.data.user);
                    return account.data.user;
                }),
                switchMap(() => this.getUserByToken()),
                catchError((err) => {
                    console.error('err', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    login() {
        return this.loginFacebook().pipe(
            concatMap(accessToken => this.loginFB(accessToken))
        );
    }

    loginFacebook() {
        const fbLoginPromise = new Promise<any>(resolve => FB.login(resolve));
        return from(fbLoginPromise).pipe(
            concatMap(({authResponse}) => authResponse ? of(authResponse.accessToken) : EMPTY)
        );
    }

    logout() {
        localStorage.removeItem(this.authLocalStorageToken);
        localStorage.removeItem(this.authLocalStorageUser);
        FB.logout((response: any) => {
            this.cookieService.delete(`fbsr_${environment.facebookAppId}`)
        });
        // location.reload();
    }

    getUserByToken(): Observable<UserType> {
        const token = this.getAuthFromLocalStorage();
        if (!token) {
            return of(undefined);
        }

        this.isLoadingSubject.next(true);
        return this.http.get<any>(`${environment.apiUrl}/user/profile`, {}).pipe(
            map((resp: any) => {
                const user: UserType = resp.data;
                if (user) {
                    this.currentUserSubject.next(user);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    private setAuthFromLocalStorage(auth: AuthModel): boolean {
        if (auth && auth.access_token) {
            localStorage.setItem(this.authLocalStorageToken, auth.access_token);
            return true;
        }
        return false;
    }

    private setInfoFromLocalStorage(user: UserModel): boolean {
        if (user) {
            localStorage.setItem(this.authLocalStorageUser, JSON.stringify(user));
            return true;
        }
        return false;
    }

    getInfoFromLocalStorage(): UserModel | null {
        const user = localStorage.getItem(this.authLocalStorageUser);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    getAuthFromLocalStorage(): string | null {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return null;
            }
            return lsValue;
        } catch (error) {
            return null;
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
