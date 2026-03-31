import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ToastService } from '../../../services/Toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe, NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast implements OnInit, OnDestroy {
  private toastService = inject(ToastService);
  toast$ = this.toastService.toast$;

  progresso = 100;
  pausado = false;

  private sub!: Subscription;
  private animFrame: number | null = null;
  private tempoRestante = 0;
  private ultimoTick = 0;
  private duracaoTotal = 0;

  ngOnInit() {
    this.sub = this.toast$.subscribe((toast) => {
      this.pararProgresso();
      if (toast) {
        this.progresso = 100;
        this.pausado = false;
        this.tempoRestante = toast.timeOut;
        this.duracaoTotal = toast.timeOut;
        this.iniciarProgresso();
      }
    });
  }

  onMouseEnter() {
    if (this.pausado) return;
    this.pausado = true;
    this.pararProgresso();
  }

  onMouseLeave() {
    if (!this.pausado) return;
    this.pausado = false;
    this.iniciarProgresso();
  }

  onClick() {
    this.toastService.fechar();
  }

  private iniciarProgresso() {
    this.pararProgresso();
    this.ultimoTick = Date.now();

    const tick = () => {
      const agora = Date.now();
      this.tempoRestante -= agora - this.ultimoTick;
      this.ultimoTick = agora;

      this.progresso = Math.max(0, (this.tempoRestante / this.duracaoTotal) * 100);

      if (this.tempoRestante <= 0) {
        this.toastService.fechar();
        return;
      }

      this.animFrame = requestAnimationFrame(tick);
    };

    this.animFrame = requestAnimationFrame(tick);
  }

  private pararProgresso() {
    if (this.animFrame !== null) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.pararProgresso();
  }
}