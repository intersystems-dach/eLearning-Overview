import { Component, HostListener } from '@angular/core';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent {
  searchValue = '';

  constructor(private courseService: CourseService) {}

  clear(): void {
    this.searchValue = '';
    this.search();
  }

  @HostListener('document:keydown.enter', ['$event'])
  search(): void {
    const lowerSearchValue = this.searchValue.toLowerCase();
    if (
      lowerSearchValue == 'philipp' ||
      lowerSearchValue == 'phil' ||
      lowerSearchValue == 'bonin'
    ) {
      this.courseService.extra();
    }
    this.courseService.searchString = lowerSearchValue;
    this.courseService.filter();
  }
}
