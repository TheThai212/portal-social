import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {OverviewComponent} from "./overview.component";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: OverviewComponent,
            },
        ]),
    ]
})
export class OverviewModule {
}
