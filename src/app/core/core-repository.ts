import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoreRepository {
    BASE_URL = environment.base_url;
    constructor(private http: HttpClient) {
    }




    post(url: string, data, params: HttpParams = null, headers: HttpHeaders = null) {
        return this.http.post(this.BASE_URL + url, data, {
            headers,
             params
        });
    }


    get(url: string, params: HttpParams = null, headers: HttpHeaders = null) {
        return this.http.get(this.BASE_URL + url, {headers, params});
    }

    delete(url: string, headers: HttpHeaders = null) {
        return this.http.delete(this.BASE_URL + url, { headers});
    }

    put(url: string, data, headers: HttpHeaders = null) {
        return this.http.put(this.BASE_URL + url, data, { headers});
    }

    patch(url: string, data, headers: HttpHeaders = null) {
        return this.http.patch(this.BASE_URL + url, data, { headers});
    }


}
