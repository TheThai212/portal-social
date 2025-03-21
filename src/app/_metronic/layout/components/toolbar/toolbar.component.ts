import {
    AfterViewInit,
    Component,
    ElementRef, inject, OnChanges,
    OnInit, SimpleChanges,
    ViewChild,
} from '@angular/core';
import {LayoutService} from '../../core/layout.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
    FacebookLoginDialogComponent
} from "../../../partials/layout/modals/modal/facebook-login-dialog/facebook-login-dialog.component";
import {AuthService, UserModel} from "../../../../modules/auth";
import {Observable, Subscription} from "rxjs";


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
    @ViewChild('ktPageTitle', {static: true}) ktPageTitle: ElementRef;
    dialog = inject(MatDialog);
    private unsubscribe: Subscription[] = [];
    pageTitleAttributes: {
        [attrName: string]: string | boolean;
    };
    toolbarContainerCssClasses: string = '';
    pageTitleCssClasses: string = '';
    user$: Observable<any>;
    info: UserModel | null;
    hideBtn: boolean = false;

    constructor(
        private layout: LayoutService,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
        this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
        this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
        this.user$ = this.authService.currentUserSubject.asObservable();
        this.getUser();
    }

    ngAfterViewInit() {
        if (this.ktPageTitle) {
            for (const key in this.pageTitleAttributes) {
                if (
                    this.pageTitleAttributes.hasOwnProperty(key) &&
                    this.ktPageTitle.nativeElement
                ) {
                    this.ktPageTitle.nativeElement.attributes[key] =
                        this.pageTitleAttributes[key];
                }
            }
        }
    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    openDialogLogin() {
        const dialogConfig: MatDialogConfig = {
            data: {},
            minWidth: this.isMobile() ? 350 : 500
        };
        this.dialog.open(FacebookLoginDialogComponent, dialogConfig).afterClosed().subscribe(result => {
            if (result.loginSuccess) {
                this.hideBtn = true;
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    getUser() {
        const info = this.authService.getInfoFromLocalStorage();
        if (!info) {
            this.info = null;
        } else {
            this.hideBtn = true;
            this.info = info;
        }

    }
}
