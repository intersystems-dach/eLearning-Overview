import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getBookmarks(): string[] {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks === null) {
      return [];
    }
    return JSON.parse(bookmarks);
  }

  addBookmark(bookmark: string): void {
    const bookmarks = this.getBookmarks();
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  removeBookmark(bookmark: string): void {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(bookmark);
    if (index > -1) {
      bookmarks.splice(index, 1);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}
