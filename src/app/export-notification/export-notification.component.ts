import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-notification',
  templateUrl: './export-notification.component.html',
  styleUrls: ['./export-notification.component.sass'],
})
export class ExportNotificationComponent {
  @Output() closeNotification = new EventEmitter();

  close() {
    this.closeNotification.emit();
  }
}
