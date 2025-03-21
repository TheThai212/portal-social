import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
})
export class AuthModule {
}
