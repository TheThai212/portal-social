import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ModalsModule} from "../../../_metronic/partials";
import {MatDialog, MatDialogConfig, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {
    FacebookLoginDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/facebook-login-dialog/facebook-login-dialog.component";
import {
    CreatePostDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/create-post-dialog/create-post-dialog.component";
import {
    PostMeDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/post-me-dialog/post-me-dialog.component";
import {
    IntroAndRuleDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/intro-and-rule-dialog/intro-and-rule-dialog.component";
import {TopPostsService} from "../../../services/top-posts.service";
import {
    ShareAndClaimComponent
} from "../../../_metronic/partials/layout/modals/modal/share-and-claim/share-and-claim.component";
import {
    FinishLoginDialogComponent
} from "../../../_metronic/partials/layout/modals/modal/finish-login-dialog/finish-login-dialog.component";
import {Observable} from "rxjs";
import {AuthService} from "../../../modules/auth";

@Component({
    selector: 'app-rules',
    standalone: true,
    imports: [
        NgOptimizedImage,
        ModalsModule,
        MatDialogContent,
        MatFormField,
        MatLabel,
        FormsModule,
        MatInput,
        NgIf
    ],
    templateUrl: './rules.component.html',
    styleUrl: './rules.component.scss'
})
export class RulesComponent implements OnInit {

    dialog = inject(MatDialog);
    isPost: boolean = false;
    totalPost: number = 0;
    lisPost: [] = [];


    constructor(
        private topPostsService: TopPostsService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        const token = this.authService.getAuthFromLocalStorage();
        if (token) {
            this.loadPostOfMe();
        }
    }


    loadPostOfMe() {
        const params = {};
        this.topPostsService.getPostOfMe(params).subscribe(resp => {
            if (resp.status === "success") {
                this.totalPost = resp.data.total;
                if (this.totalPost > 0) {
                    this.isPost = true;
                }
                this.lisPost = resp.data.data;
            }
        });
    }

    openDialogShareAndClaim() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: 350,
            maxWidth: this.isMobile() ? 350 : 500
        };
        this.dialog.open(ShareAndClaimComponent, dialogConfig);
    }

    detectDialog() {
        this.authService.currentUserSubject.asObservable().subscribe(resp => {
            if (resp) {
                this.openDialogShareAndClaim();
            } else {
                this.openDialogLogin();
            }
        });

    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    openDialogLogin() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: this.isMobile() ? 350 : 500
        };
        this.dialog.open(FacebookLoginDialogComponent, dialogConfig);
    }

    openDialogSendPost() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            maxWidth: this.isMobile() ? 350 : 500
        };
        this.dialog.open(CreatePostDialogComponent, dialogConfig);
    }

    openDialogPostMe() {
        const dialogConfig: MatDialogConfig = {
            data: this.lisPost,
            minWidth: this.isMobile() ? 350 : 900,
            maxWidth: this.isMobile() ? 350 : 900
        };
        this.dialog.open(PostMeDialogComponent, dialogConfig);
    }

    openDialogIntro() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: 450,
            maxWidth: 600
        };
        this.dialog.open(IntroAndRuleDialogComponent, dialogConfig);
    }

}
