import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
    TopCreatorDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/top-creator-dialog/top-creator-dialog.component";
import {TopCreatorService} from "../../../services/top-creator.service";
import {TopLikes, TopShare} from "./top-creator";
import {AsyncPipe, DecimalPipe, JsonPipe, NgIf} from "@angular/common";
import {AuthService} from "../../../modules/auth";
import {Observable} from "rxjs";
import {DateRange} from "../../../_metronic/shared/daterangepicker/daterange.class";
import {DateRangeDirective} from "../../../_metronic/shared/daterangepicker/daterange.directive";


@Component({
    selector: 'app-top-creator',
    standalone: true,
    imports: [
        FormsModule,
        DecimalPipe,
        NgIf,
        AsyncPipe,
        JsonPipe,
        DateRangeDirective
    ],
    templateUrl: './top-creator.component.html',
    styleUrl: './top-creator.component.scss'
})
export class TopCreatorComponent implements OnInit {

    dateFrom: string;
    dateTo: string;

    listLikeTop: TopLikes[] = [];
    listShareTop: TopShare[] = [];
    meStats: any;

    user$: Observable<any>;

    dialog = inject(MatDialog);

    constructor(
        private topCreatorService: TopCreatorService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.user$ = this.authService.currentUserSubject.asObservable();
        this.loadTop();
    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    openDialogTopCreator() {
        const dialogConfig: MatDialogConfig = {
            data: {
                dateFrom: this.dateFrom,
                dateTo: this.dateTo,
            },
            minWidth: this.isMobile() ? 350 : 600,
            maxWidth: 600
        };
        this.dialog.open(TopCreatorDialogComponent, dialogConfig);
    }

    loadTop() {
        const params = {
            date_from: this.dateFrom,
            date_to: this.dateTo,
            limit: 10,
        };
        this.topCreatorService.getTopLikeShare(params).subscribe(resp => {
            if (resp.status === "success") {
                this.listLikeTop = resp.data.top_likes;
                this.listShareTop = resp.data.top_shares;
                this.meStats = resp.data.current_user_stats;
            }
        });
    }

    dateSelected(dateRange: DateRange) {
        this.dateFrom = dateRange.startDate;
        this.dateTo = dateRange.endDate;
        this.loadTop();
    }
}
