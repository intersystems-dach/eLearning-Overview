import { Component } from '@angular/core';
import { CourseService } from '../service/course.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

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

  export(): void {
    let html = '<h1><b>InterSystems Learning Overview</b></h1>';

    this.courseService.getCategories().forEach((category) => {
      const c = this.courseService.getCourseByCategory(category);
      if (c.length > 0) {
        html += `<br><h2><i>${category}</i></h2>`;
        c.forEach((course) => {
          html += course.toHTML(3);
        });
      }
    });

    const pdfContent = htmlToPdfmake(html);

    const documentDefinition = { content: pdfContent };

    pdfMake.createPdf(documentDefinition).open();
  }
}
