import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../modules/auth";
import {finalize} from "rxjs/operators";

declare const FB: any;

export function appInitializer(authService: AuthService) {
    return () => new Promise(resolve => {
        // @ts-ignore
        window['fbAsyncInit'] = function () {
            FB.init({
                appId: environment.facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // @ts-ignore
            FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    authService.loginFB(authResponse.accessToken)
                        .pipe(finalize(() => resolve(null)))
                        .subscribe();
                } else {
                    resolve(null);
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js: any;
            var fjs: any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}
