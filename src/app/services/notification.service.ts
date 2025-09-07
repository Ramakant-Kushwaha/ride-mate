import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id?: number;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private subject = new Subject<Notification>();
  public notifications$ = this.subject.asObservable();

  public show(
    message: string,
    type: Notification['type'] = 'info',
    timeout = 5000
  ) {
    const n: Notification = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      message,
      type,
      timeout,
    };

    this.subject.next(n);
  }
}
