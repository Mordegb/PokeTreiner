import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { user } from '../../../services/user/user.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  
  users = signal<user[]>([]);

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response.items);
        console.log(response.pagination); 
      },
      error: (err) => console.error(err)
    });
  }
}
