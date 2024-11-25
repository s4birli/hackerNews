import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoryListComponent } from './components/story-list/story-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StoryListComponent],
  template: `
    <div class="app-container">
      <header class="header">
        <div class="container">
          <h1>Hacker News Viewer</h1>
        </div>
      </header>

      <main class="main container">
        <app-story-list></app-story-list>
      </main>

      <footer class="footer">
        <div class="container">
          <p>Hacker News Viewer - Built with Angular</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 1.5rem 0;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .header h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .main {
      min-height: calc(100vh - 200px);
      padding: 0 1rem;
    }

    .footer {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 1.5rem 0;
      margin-top: 3rem;
      text-align: center;
    }

    .footer p {
      margin: 0;
      opacity: 0.9;
    }
  `]
})
export class AppComponent {}