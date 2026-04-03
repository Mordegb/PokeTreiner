import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IToast {
  message: string;
  type: 'erro' | 'sucesso' | 'alerta';
  position: 'superior-direito' | 'inferior-direito';
  timeOut: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = new BehaviorSubject<IToast | null>(null);
  toast$ = this.toast.asObservable();

  private mostrar(
    message: string,
    type: IToast['type'],
    position: IToast['position'],
    timeOut: number,
  ) {
    this.toast.next({ message, type, position, timeOut });
  }

  fechar() {
    this.toast.next(null);
  }

  mostrarErro(msg: string, position: IToast['position'] = 'inferior-direito', timeOut = 3000) {
    this.mostrar(msg, 'erro', position, timeOut);
  }

  mostrarSucesso(msg: string, position: IToast['position'] = 'inferior-direito', timeOut = 3000) {
    this.mostrar(msg, 'sucesso', position, timeOut);
  }

  mostrarAlerta(msg: string, position: IToast['position'] = 'inferior-direito', timeOut = 3000) {
    this.mostrar(msg, 'alerta', position, timeOut);
  }
}
