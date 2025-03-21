import {Component} from '@angular/core';
import {HeroComponent} from "../dashboard/hero/hero.component";
import {TopCreatorComponent} from "../dashboard/top-creator/top-creator.component";
import {TopPostsComponent} from "../dashboard/top-posts/top-posts.component";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [
        HeroComponent,
        TopCreatorComponent,
        TopPostsComponent,
        NgIf
    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
