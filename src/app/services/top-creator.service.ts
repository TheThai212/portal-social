import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
export class TopCreatorService {

    baseUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getTopLikeShare(params: any): Observable<ResponseData> {
        params = Helpers.prototype.optimize_params(params)
        return this.http.get<ResponseData>(`${this.baseUrl}/facebook-posts/top`, {params})
    }

}
