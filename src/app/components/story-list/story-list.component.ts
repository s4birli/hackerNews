import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackerNewsService } from '../../services/hacker-news.service';
import { Story } from '../../models/story.model';
import { StoryItemComponent } from '../story-item/story-item.component';
import { PaginationComponent } from '../paginations/pagination.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StoryItemComponent, PaginationComponent, SearchBarComponent],
  template: `
    <div class="story-list-container">
      <app-search-bar
        (searchChange)="onSearch($event)"
      ></app-search-bar>

      <div *ngIf="loading" class="loading">
        Loading stories...
      </div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="stories-wrapper">
        <div *ngIf="filteredStories.length === 0" class="no-results">
          No stories found matching your search.
        </div>

        <app-story-item
          *ngFor="let story of filteredStories"
          [story]="story"
        ></app-story-item>

        <app-pagination
          *ngIf="filteredStories.length > 0"
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          (pageChange)="onPageChange($event)"
        ></app-pagination>
      </div>
    </div>
  `,
  styles: [`
    .story-list-container {
      max-width: 100%;
      padding: 0 1.25rem;
    }

    .stories-wrapper {
      max-width: 100%;
    }

    .no-results {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      margin: 1rem 0;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: var(--primary-color);
      font-weight: 500;
    }

    .error {
      text-align: center;
      padding: 2rem;
      color: var(--highlight-color);
      background: white;
      border-radius: 12px;
      margin: 1rem 0;
      border: 2px solid var(--highlight-color);
    }
  `]
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  filteredStories: Story[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalStories = 0;
  searchTerm = '';

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.loading = true;
    this.error = '';

    this.hackerNewsService.getStoriesPage(this.currentPage, this.pageSize)
      .subscribe({
        next: ({ stories, total }) => {
          this.stories = stories;
          this.totalStories = total;
          this.totalPages = Math.ceil(total / this.pageSize);
          this.applyFilter();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load stories. Please try again later.';
          this.loading = false;
        }
      });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadStories();
  }

  private applyFilter() {
    if (!this.searchTerm) {
      this.filteredStories = this.stories;
    } else {
      this.filteredStories = this.stories.filter(story =>
        story.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false
      );
    }
  }
}