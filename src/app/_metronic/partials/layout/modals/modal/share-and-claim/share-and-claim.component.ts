import {Component, OnInit} from '@angular/core';
import {MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService, UserModel} from "../../../../../../modules/auth";
import {NgbPopover, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

declare const FB: any;

@Component({
    selector: 'app-share-and-claim',
    standalone: true,
    imports: [
        MatDialogClose,
        MatDialogContent,
        ReactiveFormsModule,
        NgbTooltip,
        NgbPopover
    ],
    templateUrl: './share-and-claim.component.html',
    styleUrl: './share-and-claim.component.scss'
})
export class ShareAndClaimComponent implements OnInit {

    currUser: UserModel;
    tooltipText: string = "Đã sao chép";

    content: string = `🔥⚡2025 – Năm bùng nổ của thị trường chứng khoán! 📈 Sóng lớn đã đến, cơ hội vàng trong tầm tay. Ai nhanh nhạy sẽ gặt hái thành công, ai chậm chân sẽ tiếc nuối! Bạn đã sẵn sàng chưa?"`;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.getInfo();
        this.isMobile();
    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    redirectToFacebook() {
        if (this.isMobile()) {
            window.open("https://m.facebook.com", "_blank");
        } else {
            window.open('https://www.facebook.com/profile.php', "_blank");
        }
    }

    shareFn() {
        this.redirectToFacebook();
        // window.open("https://www.facebook.com/profile.php", "_blank");
        // FB.ui({
        //     display: 'popup',
        //     method: 'share_open_graph',
        //     action_type: 'og.shares',
        //     hashtag: `#vps#${this.currUser.hashtag}`,
        //     action_properties: JSON.stringify({
        //         object: {
        //             'og:url': 'https://portal-social-challenge.thaithe.io.vn/',
        //         },
        //     })
        // }, function (response: any) {
        // });
    }

    getInfo() {
        const currentInfo = this.authService.getInfoFromLocalStorage();
        if (currentInfo) {
            this.currUser = currentInfo;
        }
    }

    copyMessage(text?: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        if (text) {
            selBox.value = text;
        } else {
            selBox.value = `${this.content}\n#vps #${this.currUser.hashtag}`;
        }
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

}
