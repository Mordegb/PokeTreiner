import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ToastService } from '../../../services/Toast/toast.service';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe, NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast implements OnDestroy {
  private toastService = inject(ToastService);
  toast$ = this.toastService.toast$;
  private timer: any;
  reiniciando = false;

  constructor() {
    this.toast$.subscribe(toast => {
      clearTimeout(this.timer);
      if (toast) this.iniciarTimer(toast.timeOut);
    });
  }

  iniciarTimer(timeOut: number) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.toastService.fechar(), timeOut);
  }

  onMouseEnter() {
    clearTimeout(this.timer);
  }

  onMouseLeave(timeOut: number) {
    this.reiniciando = true;
    setTimeout(() => this.reiniciando = true, 3000);
    this.iniciarTimer(timeOut);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}