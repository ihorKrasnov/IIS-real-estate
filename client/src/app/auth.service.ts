import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../api-services/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private loginService: LoginService) {}

  login(username: string, password: string): Observable<boolean> {
    return this.loginService.login({ username, password }).pipe(
      map((res) => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('username', res.profile.username);
        return true;
      }),
      catchError((err) => {
        console.error(err);
        return of(false); 
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken(); 
  }

  getUserName(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }
}
