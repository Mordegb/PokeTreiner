import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export interface Me{
  email?:string;
  senha?:string;
}

export interface MeResponse{
  Token?:string
}

@Injectable({
  providedIn: 'root',
})



export class AuthService {


}
