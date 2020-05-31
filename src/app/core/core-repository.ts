import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from './model/user';
import {BehaviorSubject} from 'rxjs';
import {USER_KEY} from './constants';

@Injectable({
    providedIn: 'root'
})
export class CoreRepository {
    BASE_URL = environment.base_url;
    constructor(private http: HttpClient) {
    }

    private static createAuthorizationHeader(headers: HttpHeaders = null) {
        const mHeader: HttpHeaders = (headers) ? headers : new HttpHeaders();
        return mHeader;
    }
    post(url: string, data, params: HttpParams = null, headers: HttpHeaders = null) {
        return this.http.post(this.BASE_URL + url, data, {
            headers:CoreRepository.createAuthorizationHeader(headers),
             params
        });
    }


    get(url: string, params: HttpParams = null, headers: HttpHeaders = null) {
        return this.http.get(this.BASE_URL + url, {headers:CoreRepository.createAuthorizationHeader(headers), params});
    }

    delete(url: string, headers: HttpHeaders = null) {
        return this.http.delete(this.BASE_URL + url, { headers:CoreRepository.createAuthorizationHeader(headers)});
    }

    put(url: string, data, headers: HttpHeaders = null) {
        return this.http.put(this.BASE_URL + url, data, { headers:CoreRepository.createAuthorizationHeader(headers)});
    }

    patch(url: string, data, headers: HttpHeaders = null) {
        return this.http.patch(this.BASE_URL + url, data, { headers:CoreRepository.createAuthorizationHeader(headers)});
    }

    set user(user: User) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    static get user() {
        return (JSON.parse(localStorage.getItem(USER_KEY)) as User);
    }
    static get userId():string {
        return this.user.id;
    }

}
