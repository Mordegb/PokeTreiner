import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { UserService } from '../../services/Register/user.service';
import { ToastService } from '../../services/Toast/toast.service';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);
  private toast = inject(ToastService);

  RegisterForm = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
    UserEmail: new FormControl('', [Validators.required, Validators.maxLength(320)]),
    UserPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
  });

  CriarConta() {
    const email = this.RegisterForm.value.UserEmail ?? '';
    const senha = this.RegisterForm.value.UserPassword ?? '';
    const name = this.RegisterForm.value.UserName ?? '';

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      this.toast.mostrarAlerta('Este não é um email válido.', 'inferior-direito', 3500);
      return;
    }

    this.userService.CriarConta(name, email, senha).subscribe({
      next: (response) => {
        if (!response.error) {
          console.log('usuario criado, manda o dan conferir');
          this.toast.mostrarSucesso('Conta criada!', 'superior-direito', 3800);
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao criar usuario:', error);
        if (error.status === 400) {
          this.toast.mostrarErro('Email ja esta em uso.');
        }
      },
    });
  }

  IrParaLogin() {
    this.router.navigate(['/login']);
  }
}
