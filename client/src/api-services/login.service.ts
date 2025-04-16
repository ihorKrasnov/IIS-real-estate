import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseApiService {

    override controllerName: string = 'Account';

    constructor(http: HttpClient) {
        super(http);
    }


    login(data: LoginForm): Observable<AuthResult> {
        return this.post<AuthResult>(`/login`, data);
    }

}

export interface LoginForm {
    username: string;
    password: string;
  }
  
  export interface AuthResult {
    token: string;
    profile: Profile;
  }
  export interface Profile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    clientType: number;
  }
