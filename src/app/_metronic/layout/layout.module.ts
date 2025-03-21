import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {RouterModule, Routes} from '@angular/router';
import {
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutComponent} from './layout.component';
import {Routing} from '../../pages/routing';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';
import {ScriptsInitComponent} from './components/scripts-init/scripts-init.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {PageTitleComponent} from './components/header/page-title/page-title.component';
import {HeaderMenuComponent} from './components/header/header-menu/header-menu.component';
import {ModalsModule} from '../partials';
import {DropdownMenusModule} from "../partials/content/dropdown-menus/dropdown-menus.module";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: Routing,
    },
];

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        ScriptsInitComponent,
        ToolbarComponent,
        PageTitleComponent,
        HeaderMenuComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InlineSVGModule,
        NgbDropdownModule,
        NgbProgressbarModule,
        ModalsModule,
        NgbTooltipModule,
        TranslateModule,
        DropdownMenusModule
    ],
    exports: [RouterModule],
})
export class LayoutModule {
}
