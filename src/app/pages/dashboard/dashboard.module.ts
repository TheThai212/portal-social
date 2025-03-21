import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule } from '../../_metronic/partials';
import {HeroComponent} from "./hero/hero.component";
import {RulesComponent} from "./rules/rules.component";
import {TopCreatorComponent} from "./top-creator/top-creator.component";
import {TopPostsComponent} from "./top-posts/top-posts.component";

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
            },
        ]),
        ModalsModule,
        HeroComponent,
        RulesComponent,
        TopCreatorComponent,
        TopPostsComponent
    ],
})
export class DashboardModule {}
