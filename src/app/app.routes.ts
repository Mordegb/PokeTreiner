import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Register } from './pages/register/register';
import { Home } from './pages/home/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'register' , component: Register , pathMatch: 'full'},
  {path: 'home',component:Home,children:[]}
];
