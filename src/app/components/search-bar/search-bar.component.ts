import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search stories..."
        [ngModel]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        class="search-input"
      >
    </div>
  `,
  styles: [`
    .search-bar {
      margin: 1.5rem 0;
    }

    .search-input {
      width: calc(100% - 2.5rem);
      padding: 1rem 1.25rem;
      border: 2px solid var(--border-color);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: white;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(90, 169, 230, 0.15);
    }

    .search-input::placeholder {
      color: #999;
    }
  `]
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();
  
  private searchSubject = new Subject<string>();
  searchTerm = '';

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }
}