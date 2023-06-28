import { Component, Input } from '@angular/core';
import { Course } from 'src/utils/Course';
import { CourseService } from '../service/course.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass'],
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(
    private courseService: CourseService,
    private localStorageService: LocalStorageService
  ) {}

  getSearchString(): string {
    return this.courseService.searchString;
  }

  bookmark(): void {
    this.course.bookmarked = true;
    this.localStorageService.addBookmark(this.course.name);
  }

  unBookmark(): void {
    this.course.bookmarked = false;
    this.localStorageService.removeBookmark(this.course.name);
  }
}
