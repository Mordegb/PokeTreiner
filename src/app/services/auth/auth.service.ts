import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

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
  refresh_token?: string;
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
    const body = new HttpParams() //isso aq não transforma os parametro em json
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http
      .post<ApiResponse>(`${environment.apiUrl}/auth/login/`, body, {
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
    if (session.refresh_token) {
      sessionStorage.setItem('refresh_token', session.refresh_token);
    }
  }

  refreshStorage(): Observable<ApiResponse> {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearSessionStorage();
      return throwError(() => new Error('refresh token não encontreado'));
    }
    const params = new HttpParams().set('refresh_token', refreshToken);
    return this.http
      .post<ApiResponse>(
        `${environment.apiUrl}/auth/refresh`,
        null,
        {
          params,
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .pipe(
        tap((session) => this.storeSession(session)),
        catchError((error) => {
          this.clearSessionStorage();
          this.router.navigate(['/login']);
          return throwError(() => error);
        }),
      );
  }

  clearSessionStorage(): void {
    //função de logout
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
