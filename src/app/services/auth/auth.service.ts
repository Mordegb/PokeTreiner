import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { error } from 'console';

export interface Me {
  grant_type?: string | null;
  email: string;
  senha: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
}

export interface ApiResponse {
  access_token?: string;
  token_type?: string;
  error?: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(email: string, password: string): Observable<ApiResponse> {
    const body = new HttpParams() //isso aq não tranorma os parametro em json
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http
      .post<ApiResponse>(`${environment.api}/auth/login/`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  storeSession(session: ApiResponse): void {
    if (session.access_token) {
      sessionStorage.setItem('access_token', session.access_token);
    }
    // if (session.refresh_token) {
    //   sessionStorage.setItem('refresh_token', session.refresh_token);
    //   this.router.navigate(['/login'])
    // }
  }
}
