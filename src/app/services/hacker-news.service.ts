import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl = 'https://hackernews-brebgba9emg3acgg.ukwest-01.azurewebsites.net/api/Stories';

  constructor(private http: HttpClient) { }


  getStoriesPage(page: number, pageSize: number): Observable<{ stories: Story[], total: number }> {
    const url = `${this.baseUrl}/page?page=${page}&pageSize=${pageSize}`;
    return this.http.get<{ stories: Story[]; total: number }>(url);
  }
}