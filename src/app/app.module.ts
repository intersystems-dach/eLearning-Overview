import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { MetaDataComponent } from './meta-data/meta-data.component';
import { SelectionComponent } from './selection/selection.component';
import { CourseComponent } from './course/course.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchBarComponent, MetaDataComponent, SelectionComponent, CourseComponent, FilterBarComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
