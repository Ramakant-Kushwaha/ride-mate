import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

interface NotificationItem {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationItem[] = [];
  private timers = new Map<number, number>();
  private sub?: Subscription;

  constructor(private ns: NotificationService) {}

  ngOnInit() {
    this.ns.notifications$.subscribe((n) => {
      this.addNotification(n.message, n.type, n.timeout ?? 5000);
    });
  }

  addNotification(
    message: string,
    type: NotificationItem['type'] = 'info',
    timeout = 1500
  ) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const notification: NotificationItem = { id, message, type, timeout };
    this.notifications.push(notification);

    if (timeout > 0) {
      setTimeout(() => this.dismiss(id), timeout);
      this.timers.set(id, id);
    }
  }

  dismiss(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);

    const timerId = this.timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
    }
  }

  clearAll() {
    this.notifications = [];
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.clearAll();
  }
}
