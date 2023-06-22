import { Component } from '@angular/core';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass'],
})
export class SelectionComponent {
  constructor(private courseService: CourseService) {}

  getCourseService(): CourseService {
    return this.courseService;
  }
}
