import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  // reuseable select component
  @Input() optionsData!: any[];

  @Input() selectValue!: number;
  @Output() selectValueChange = new EventEmitter<number>();

  selectChangeHandler(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.selectValue = +selectEl.value;
    this.selectValueChange.emit(this.selectValue);
  }
}
