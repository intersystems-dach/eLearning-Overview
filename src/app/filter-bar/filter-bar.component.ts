import { Component } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Course } from 'src/utils/Course';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.sass'],
})
export class FilterBarComponent {
  type: string = '';
  category: string = '';
  level: string = '';
  duration: string = '';

  constructor(private courseService: CourseService) {}

  apply() {
    this.courseService.typeFilter = this.type;
    this.courseService.categoryFilter = this.category;
    this.courseService.levelFilter = this.level;
    this.courseService.durationFilter = this.duration;
    this.courseService.filter();
  }

  reset() {
    this.type = '';
    this.category = '';
    this.level = '';
    this.duration = '';
    this.apply();
  }

  getCourseService(): CourseService {
    return this.courseService;
  }
}
