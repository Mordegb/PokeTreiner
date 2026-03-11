import { Component, inject } from '@angular/core';
import { Router , RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);

  HowIsThatPokemon(){
    window.open('https://www.youtube.com/watch?v=WSGV_n6H1n0' , '_blank' )
  }

  InputPassword:String = 'password'
  ShowPassword(){
    this.InputPassword = this.InputPassword === 'password' ? 'text':'password'
  }

}
