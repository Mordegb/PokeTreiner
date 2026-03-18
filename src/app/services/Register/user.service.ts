import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Me {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  error?: boolean;
  message?: string;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);

  CriarConta( name:string, email: string, password: string): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(
      `${environment.api}user/`,
      { name ,email , password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).pipe(
      catchError((error)=>{
        return throwError(()=>error)
      })
    );
  }
}
