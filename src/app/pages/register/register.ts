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

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);

  RegisterForm = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  teste() {
    if (this.RegisterForm.valid) {
      console.log(this.RegisterForm);
    } else {
      console.log('ta podi');
    }
  }

  CriarConta() {
    if (this.RegisterForm.invalid) {
      return;
    }
    const email = this.RegisterForm.value.UserEmail ?? '';
    const senha = this.RegisterForm.value.UserPassword ?? '';
    const name = this.RegisterForm.value.UserName ?? '';

    this.userService.CriarConta(name, email, senha).subscribe({
      next: (response) => {
        if (!response.error) {
          console.log('usuario criado, manda o dan conferir');
          this.router.navigate(['/login'])
          // notficação de coisa boa
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('erro no logi:',error)
        if (error.status === 400) {
          console.log('esse email ja esta sendo usado.');
        }
      },
    });
  }

  IrParaLogin() {
    this.router.navigate(['/login']);
  }
}
