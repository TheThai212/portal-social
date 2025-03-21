import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Helpers} from "../_metronic/shared/helpers/helpers";

interface ResponseData {
    status: string;
    error_code: number;
    message: string;
    message_code: string;
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class TopPostsService {

    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getTopPost(params: any): Observable<ResponseData> {
        params = Helpers.prototype.optimize_params(params)
        return this.http.get<ResponseData>(`${this.baseUrl}/facebook-posts/public-top`, {params})
    }

    getPostOfMe(params: any): Observable<ResponseData> {
        params = Helpers.prototype.optimize_params(params)
        return this.http.get<ResponseData>(`${this.baseUrl}/facebook-posts/my-posts`, {params})
    }

    createPost(payload: any): Observable<ResponseData> {
        return this.http.post<ResponseData>(`${this.baseUrl}/facebook-posts`, JSON.stringify(payload))
    }

    updateRefCode(payload: any, uid: number): Observable<ResponseData> {
        return this.http.put<ResponseData>(`${this.baseUrl}/users/${uid}`, JSON.stringify(payload))
    }
}
