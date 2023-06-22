import { Component, Input } from '@angular/core';
import { Course } from 'src/utils/Course';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.sass'],
})
export class MetaDataComponent {
  @Input() course!: Course;
}
