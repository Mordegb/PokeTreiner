import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

export interface user {
  id: number;
  name: string;
  email: string;
}

export interface Pagination {
  pages_count: number;
  items_count: number;
  items_per_page: number;
  prev: number | null;
  prox: number | null;
  current: number;
}

export interface Me {
  page?: number;
  rows_for_page?: number;
}

export interface UserResponse {
  items: user[];
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {  // ✅ nome diferente da interface
  private http = inject(HttpClient);

  getAllUsers(page: number = 1, rowsPerPage: number = 10): Observable<UserResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('rows_per_page', rowsPerPage);

    return this.http.get<UserResponse>(`${environment.apiUrl}/user/all`, { params }); // ✅
  }
}
