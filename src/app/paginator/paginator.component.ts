import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() values!: number[];

  @Input() selectedPage!: number;
  @Output() selectedPageChange = new EventEmitter<number>();

  paginatorClickHandler(event: MouseEvent) {
    event.preventDefault();
    const pageEl = event.target as HTMLAnchorElement;
    if (pageEl.dataset['page'] !== undefined) {
      this.selectedPage = +pageEl.dataset['page'];
      this.selectedPageChange.emit(this.selectedPage);
    }
  }
}
