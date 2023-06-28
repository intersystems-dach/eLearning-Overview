import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportNotificationComponent } from './export-notification.component';

describe('ExportNotificationComponent', () => {
  let component: ExportNotificationComponent;
  let fixture: ComponentFixture<ExportNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportNotificationComponent]
    });
    fixture = TestBed.createComponent(ExportNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
