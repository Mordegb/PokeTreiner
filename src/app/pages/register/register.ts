import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { UserService } from '../../services/Register/user.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);

  RegisterForm = new FormGroup({
      name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  
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
    const Email = this.RegisterForm.value.email ?? '';
    const Senha = this.RegisterForm.value.password ?? '';
    const Name = this.RegisterForm.value.name ?? '';

    this.userService.CriarConta(Name,Email, Senha).subscribe({
      next: (response) => {
        if (response.error === false) {
          console.log('usuario criado manda o dan conferir');
        }
      },
      error: (error) => {
        console.log('não funcionou e não criou');
      },
    });
  }

  IrParaLogin() {
    this.router.navigate(['login']);
  }
}
