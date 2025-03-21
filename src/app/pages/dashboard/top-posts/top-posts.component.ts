import {Component, OnInit} from '@angular/core';
import {TopPostsService} from "../../../services/top-posts.service";
import {CommonModule} from "@angular/common";
import {TopPost} from "./top-post";
import {TransferHourPipe} from "../../../_metronic/shared/pipe/transfer-hour.pipe";
import {FormatNumberPipe} from "../../../_metronic/shared/pipe/format-number.pipe";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-top-posts',
    standalone: true,
    imports: [
        CommonModule,
        TransferHourPipe,
        FormatNumberPipe,
        FormsModule
    ],
    templateUrl: './top-posts.component.html',
    styleUrl: './top-posts.component.scss'
})
export class TopPostsComponent implements OnInit {

    listPost: TopPost[] = [];
    topType: "share_count" | 'like_count' | null = null;

    constructor(
        private topPostsService: TopPostsService,
    ) {
    }

    ngOnInit() {
        this.loadTopPosts(null);
    }

    loadTopPosts(orderBy: "share_count" | 'like_count' | null) {
        const params: {} = {
            order_by: orderBy
        };

        this.topPostsService.getTopPost(params).subscribe((resp) => {
            if (resp.status === "success") {
                this.listPost = resp.data;
            }
        });
    }

    openLink(link: string) {
        window.open(link, "_blank");
    }

}
