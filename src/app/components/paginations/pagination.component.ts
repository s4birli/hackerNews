import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination">
      <button
        [disabled]="currentPage === 1"
        (click)="onPageChange(currentPage - 1)"
        class="pagination-button"
      >
        Previous
      </button>
      
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      
      <button
        [disabled]="currentPage === totalPages"
        (click)="onPageChange(currentPage + 1)"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      margin: 2rem 0;
      padding: 1rem;
    }

    .pagination-button {
      padding: 0.75rem 1.5rem;
      background: var(--primary-color);
      border: none;
      border-radius: 12px;
      color: white;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .pagination-button:hover:not(:disabled) {
      background: var(--secondary-color);
      transform: translateY(-1px);
    }

    .pagination-button:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .page-info {
      font-size: 0.95rem;
      color: #666;
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}