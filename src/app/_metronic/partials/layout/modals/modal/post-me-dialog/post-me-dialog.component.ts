import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {FormatNumberPipe} from "../../../../../shared/pipe/format-number.pipe";
import {TransferHourPipe} from "../../../../../shared/pipe/transfer-hour.pipe";

@Component({
  selector: 'app-post-me',
  standalone: true,
    imports: [
        MatDialogClose,
        MatDialogContent,
        FormatNumberPipe,
        TransferHourPipe
    ],
  templateUrl: './post-me-dialog.component.html',
  styleUrl: './post-me-dialog.component.scss'
})
export class PostMeDialogComponent {
    data = inject(MAT_DIALOG_DATA);
}
