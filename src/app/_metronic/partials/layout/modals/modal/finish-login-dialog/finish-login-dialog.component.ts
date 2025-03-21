import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {TopPostsService} from "../../../../../../services/top-posts.service";
import Swal from "sweetalert2";
import {AuthService} from "../../../../../../modules/auth";
import {ShareAndClaimComponent} from "../share-and-claim/share-and-claim.component";

@Component({
    selector: 'app-finish-login-dialog',
    standalone: true,
    imports: [
        MatDialogContent,
        MatDialogClose,
        FormsModule
    ],
    templateUrl: './finish-login-dialog.component.html',
    styleUrl: './finish-login-dialog.component.scss'
})
export class FinishLoginDialogComponent {

    payload: {agency_code: string | null} = {agency_code: null};
    dialog = inject(MatDialog);

    constructor(
        private topPostService: TopPostsService,
        private authService: AuthService,
        private dialogRef: MatDialogRef<FinishLoginDialogComponent>
    ) {}

    sendRefCode() {
        if (!this.payload.agency_code) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                toast: true,
                title: "Mã giới thiệu là bắt buộc",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        const info = this.authService.getInfoFromLocalStorage();

        this.topPostService.updateRefCode(this.payload, info ? info.id : -1).subscribe(resp => {
            if (resp.status === "success") {
                this.dialogRef.close();
                this.openDialogShareAndClaim();
            } else if (resp.error_code === 422) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    toast: true,
                    title: resp.message || "Lỗi không xác định",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }

    openDialogShareAndClaim() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: 350,
            maxWidth: 500
        };
        this.dialog.open(ShareAndClaimComponent, dialogConfig);
    }

}
