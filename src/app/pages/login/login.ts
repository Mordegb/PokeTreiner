import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastService } from '../../services/Toast/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private service = inject(AuthService);
  private toast = inject(ToastService);

  loginSuceful: boolean = true;

  HowIsThatPokemon() {
    window.open('https://www.youtube.com/watch?v=WSGV_n6H1n0', '_blank');
  }

  InputPassword: String = 'password';
  ShowPassword() {
    this.InputPassword = this.InputPassword === 'password' ? 'text' : 'password';
  }

  LoginForm = new FormGroup({
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  FazerLogin() {
    const EmailDigitado = this.LoginForm.value.UserEmail ?? '';
    const SenhaDigitada = this.LoginForm.value.UserPassword ?? '';

    this.service.login(EmailDigitado, SenhaDigitada).subscribe({
      next: (response) => {
        if (response.access_token) {
          this.service.storeSession(response);
          // alert('login realizado com sucesso');
          this.toast.mostrarSucesso('DEU BOM PORRA' , )
          this.loginSuceful = true;
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.toast.mostrarErro('mensagem funcional' , 'inferior-direito',5200)
        this.loginSuceful = false;
      },
    });
  }

  limparErro() {
    if (!this.loginSuceful) {
      this.loginSuceful = true;
    }
  }

  IrCriar() {
    this.router.navigate(['/register']);
  }
}
