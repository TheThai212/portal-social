import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
    private excludedUrls: string[] = [
        '/api/encryption/public-key',
    ];

    constructor(private encryptionService: EncryptionService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isExcludedUrl(request.url)) {
            return next.handle(request);
        }

        if (request.body) {
            const { data, headers } = this.encryptionService.encryptPayload(request.body);
            console.log(data);
            console.log(request.body);
            let modifiedRequest = request.clone({
                body: {dataJson: data},
                headers: request.headers.set('X-Encrypted-Request', 'true')
            });

            if (headers) {
                Object.keys(headers).forEach(key => {
                    modifiedRequest = modifiedRequest.clone({
                        headers: modifiedRequest.headers.set(key, headers[key])
                    });
                });
            }

            request = modifiedRequest;
        }

        return next.handle(request);
    }

    private isExcludedUrl(url: string): boolean {
        return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
    }
}
