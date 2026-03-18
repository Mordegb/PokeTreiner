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
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);

  IrParaLogin(){
    this.router.navigate(['login'])
  }

}
