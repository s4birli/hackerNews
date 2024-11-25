import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="story-item">
      <h2 class="story-title">
        <a *ngIf="story.url" [href]="story.url" target="_blank" rel="noopener">
          {{ story.title }}
        </a>
        <span *ngIf="!story.url">{{ story.title }} (Link not available)</span>
      </h2>
      <div class="story-meta">
        <span class="meta-item">by {{ story.by }}</span>
        <span class="meta-separator">•</span>
        <span class="meta-item">{{ story.time | date }}</span>
        <span class="meta-separator">•</span>
        <span class="meta-item score">{{ story.score }} points</span>
      </div>
    </div>
  `,
  styles: [`
    .story-item {
      background: white;
      padding: 1.25rem;
      margin-bottom: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid var(--border-color);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .story-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .story-title {
      margin: 0 0 0.75rem 0;
      font-size: 1.25rem;
      line-height: 1.4;
    }

    .story-title a {
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .story-title a:hover {
      color: var(--secondary-color);
    }

    .story-meta {
      font-size: 0.9rem;
      color: #666;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .meta-item {
      color: #666;
    }

    .meta-separator {
      color: #ccc;
    }

    .score {
      background: var(--accent-color);
      color: #333;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-weight: 500;
    }
  `]
})
export class StoryItemComponent {
  @Input() story!: Story;
}