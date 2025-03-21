import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './modules/auth';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TokenInterceptor} from "./modules/auth/token.interceptor";
import {ErrorInterceptor} from "./modules/auth/error.interceptor";
import {appInitializer} from "./_metronic/shared/helpers/app.initializer";
import {environment} from "../environments/environment";
import {EncryptionInterceptor} from "../interceptors/encryption.interceptor";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },
        provideAnimationsAsync(),
        ...(environment.enableEncryption ? [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: EncryptionInterceptor,
                multi: true
            }
        ] : [])
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
