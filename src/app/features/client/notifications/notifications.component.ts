import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/loyalty.model';

@Component({
  selector: 'app-client-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class ClientNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getAll().subscribe(res => { if (res.success) this.notifications = res.data.content; });
    this.notificationService.getUnreadCount().subscribe(res => { if (res.success) this.unreadCount = res.data; });
  }

  markRead(n: Notification): void {
    if (!n.read) {
      this.notificationService.markAsRead(n.id).subscribe(() => { n.read = true; this.unreadCount--; });
    }
  }

  markAllRead(): void {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.notifications.forEach(n => n.read = true);
      this.unreadCount = 0;
    });
  }

  getIcon(type: string): string {
    const map: Record<string, string> = {
      'BOOKING_CONFIRMATION': 'event_available', 'BOOKING_CANCELLATION': 'event_busy',
      'PAYMENT_CONFIRMATION': 'payment', 'REVIEW_REQUEST': 'rate_review',
      'PROMOTION': 'local_offer', 'SYSTEM': 'info'
    };
    return map[type] || 'notifications';
  }
}
