import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  getNewStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/newstories.json`);
  }

  getStory(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.baseUrl}/item/${id}.json`);
  }

  getStoriesPage(page: number, pageSize: number): Observable<{ stories: Story[], total: number }> {
    return this.getNewStories().pipe(
      map(ids => ({
        pageIds: ids.slice((page - 1) * pageSize, page * pageSize),
        total: ids.length
      })),
      switchMap(({ pageIds, total }) => 
        forkJoin(pageIds.map(id => this.getStory(id))).pipe(
          map(stories => ({ stories, total }))
        )
      )
    );
  }
}