import { Component, Input } from '@angular/core';
import { Course } from 'src/utils/Course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass'],
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private courseService: CourseService) {}

  getSearchString(): string {
    return this.courseService.searchString;
  }
}
