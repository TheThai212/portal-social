import {Component, inject, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogClose,
    MatDialogConfig,
    MatDialogContent,
    MatDialogRef
} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../modules/auth";
import {FinishLoginDialogComponent} from "../finish-login-dialog/finish-login-dialog.component";

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
    selector: 'app-facebook-login',
    standalone: true,
    imports: [
        MatDialogContent,
        MatDialogClose
    ],
    templateUrl: './facebook-login-dialog.component.html',
    styleUrl: './facebook-login-dialog.component.scss'
})
export class FacebookLoginDialogComponent {

    dialog = inject(MatDialog);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private authService: AuthService,
        private router: Router,
        private dialogRef: MatDialogRef<FacebookLoginDialogComponent>,
    ) {}

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    loginFacebook() {
        this.authService.login()
            .subscribe(resp => {
                this.dialogRef.close({loginSuccess: true});
                location.reload();
            });
    }
}
