import { Component, HostListener } from '@angular/core';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent {
  searchValue: string = '';
  noMatches: boolean = false;

  constructor(private courseService: CourseService) {}

  search(): void {
    let lowerSearchValue = this.searchValue.toLowerCase();
    if (lowerSearchValue == 'pbonin') {
      window.location.href = 'https://philipp-bonin.com/';
    }
    this.courseService.searchString = lowerSearchValue;
    this.courseService.filter();
  }
}
