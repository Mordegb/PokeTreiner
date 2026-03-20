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
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);

  RegisterForm = new FormGroup({
      UserName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    UserEmail: new FormControl('', Validators.required),
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

    this.userService.CriarConta(name,email, senha).subscribe({
      next: (response) => {
        if (response.error === false) {
          console.log('usuario criado, manda o dan conferir');
          //navigate pro login
          //mensagem de que criar a conta deu certo
        }
      },
      error: (error) => {
        console.log('não funcionou e não criou');
        //mensagem com o motivo de dar erado
      },
    });
  }

  IrParaLogin() {
    this.router.navigate(['login']);
  }
}
