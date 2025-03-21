import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../modules/auth";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
    FinishLoginDialogComponent
} from "../../_metronic/partials/layout/modals/modal/finish-login-dialog/finish-login-dialog.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    dialog = inject(MatDialog);

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.popUpFinishLogin();
    }

    popUpFinishLogin() {
        this.authService.getUserByToken().subscribe(resp => {
            if (resp && !resp.agency_code) {
                this.openDialogFinishLogin();
            }
        });
    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    openDialogFinishLogin() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: this.isMobile() ? 350 : 500,
            disableClose: true
        };
        this.dialog.open(FinishLoginDialogComponent, dialogConfig);
    }

}
