import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {AsyncPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../../../../modules/auth";
import {Observable} from "rxjs";
import {TopCreatorService} from "../../../../../../services/top-creator.service";
import {TopLikes, TopShare} from "../../../../../../pages/dashboard/top-creator/top-creator";

@Component({
    selector: 'app-top-creator-dialog',
    standalone: true,
    imports: [
        MatDialogClose,
        MatDialogContent,
        NgClass,
        NgIf,
        DecimalPipe,
        AsyncPipe
    ],
    templateUrl: './top-creator-dialog.component.html',
    styleUrl: './top-creator-dialog.component.scss'
})
export class TopCreatorDialogComponent implements OnInit {
    data = inject(MAT_DIALOG_DATA);
    isReaction: boolean = true;
    user$: Observable<any>;
    listLikeTop: TopLikes[] = [];
    listShareTop: TopShare[] = [];
    meStats: any;

    constructor(
        private authService: AuthService, private topCreatorService: TopCreatorService
    ) {}

    ngOnInit() {
        this.user$ = this.authService.currentUserSubject.asObservable();
        this.loadTop();
    }

    getTopReaction() {
        this.isReaction = true;
    }

    getTopShare() {
        this.isReaction = false;
    }

    loadTop() {
        const params = {
            date_from: this.data.dateFrom,
            date_to: this.data.dateTo,
            limit: 50,
        };
        this.topCreatorService.getTopLikeShare(params).subscribe(resp => {
            if (resp.status === "success") {
                this.listLikeTop = resp.data.top_likes;
                this.listShareTop = resp.data.top_shares;
                this.meStats = resp.data.current_user_stats;
            }
        });
    }

}
