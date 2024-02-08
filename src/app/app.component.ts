import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly navLinks = [
    { label: 'Table', url: '/' },
    { label: 'Chart', url: '/chart' },
    { label: 'Heat Index', url: '/calculator' }
  ];
  activePage = this.pageUrl;

  get pageUrl() {
    // just for case user manually types url path
    const currentUrlPath = window.location.pathname;
    const linkIndex = this.navLinks.findIndex(link => link.url === currentUrlPath);
    
    return linkIndex;
  }

  pageChangeHandler(event: MouseEvent) {
    const linkEl = event.target as HTMLAnchorElement;
    const linkId = linkEl.dataset['link'];

    if (linkId !== undefined && typeof +linkId === 'number') {
      this.activePage = +linkId;
    }
  }
}
