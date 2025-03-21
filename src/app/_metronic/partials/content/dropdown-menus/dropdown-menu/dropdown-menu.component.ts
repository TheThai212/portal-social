import {Component, HostBinding, OnInit} from '@angular/core';
import {AuthService, UserModel} from "../../../../../modules/auth";
import {Observable} from "rxjs";

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements OnInit {
    @HostBinding('class') class =
        'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
    user$: Observable<any>;
    info: UserModel | null;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.user$ = this.authService.currentUserSubject.asObservable();
        this.user$.subscribe(info => {
            this.info = info;
        });
    }

    logout() {
        this.authService.logout();
        location.reload();
    }

}
