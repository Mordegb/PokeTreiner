import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  loginSuceful:boolean = true

  UsuariosExemplo = [
    { email: 'joao.silva@gmail.com', senha: 'joao123' },
    { email: 'maria.santos@gmail.com', senha: 'maria456' },
    { email: 'pedro.oliveira@gmail.com', senha: 'pedro789' },
    { email: 'ana.costa@gmail.com', senha: 'ana321' },
    { email: 'carlos.almeida@gmail.com', senha: 'cadu123' },
    { email: 'admin@gmail.com', senha: 'adm1234' },
    { email: 'fernanda.gomes@gmail.com', senha: 'fernanda741' },
  ];

  HowIsThatPokemon() {
    window.open('https://www.youtube.com/watch?v=WSGV_n6H1n0', '_blank');
  }

  InputPassword: String = 'password';
  ShowPassword() {
    this.InputPassword = this.InputPassword === 'password' ? 'text' : 'password';
  }

   LoginForm = new FormGroup({
    UserEmail: new FormControl('',[Validators.required, Validators.email]),
    UserPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  BuscarUsuario() {
    const EmailDigitado = this.LoginForm.value.UserEmail;
    const SenhaDigitada = this.LoginForm.value.UserPassword;

    const foundUser = this.UsuariosExemplo.find((u) => u.email === EmailDigitado);
    if(foundUser &&  foundUser.senha === SenhaDigitada){
      // this.router.navigate(['/home'])
      console.log(this.LoginForm)
      this.loginSuceful = true;
    }
    else{
      this.LoginForm.reset()
      console.log('usario invalido')
      this.loginSuceful = false;
    }
  }
  
  limparErro() {
    if (!this.loginSuceful) {
      this.loginSuceful = true;
    }
  }
}
