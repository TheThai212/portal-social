import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import {InlineSVGModule} from "ng-inline-svg-2";

@NgModule({
  declarations: [
    DropdownMenuComponent,
  ],
    imports: [CommonModule, InlineSVGModule],
  exports: [
    DropdownMenuComponent,
  ],
})
export class DropdownMenusModule {}
