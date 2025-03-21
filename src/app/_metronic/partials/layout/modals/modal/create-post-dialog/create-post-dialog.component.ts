import {Component, OnInit} from '@angular/core';
import {MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {TopPostsService} from "../../../../../../services/top-posts.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-create-post-dialog',
    standalone: true,
    imports: [
        MatDialogClose,
        MatDialogContent,
        FormsModule
    ],
    templateUrl: './create-post-dialog.component.html',
    styleUrl: './create-post-dialog.component.scss'
})
export class CreatePostDialogComponent implements OnInit {

    data: string;

    constructor(
        private topPostService: TopPostsService,
        private dialogRef: MatDialogRef<CreatePostDialogComponent>
    ) {}

    ngOnInit() {}

    createPost() {
        const payload = {
            post_url: this.data
        };

        if (this.data) {
            this.topPostService.createPost(payload).subscribe(resp => {
                if (resp.status === "success") {
                    this.dialogRef.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Đăng bài lên web thành công",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }
    }

}
