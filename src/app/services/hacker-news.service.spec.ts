import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService } from './hacker-news.service';
import { Story } from '../models/story.model';

describe('HackerNewsService', () => {
    let service: HackerNewsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HackerNewsService]
        });
        service = TestBed.inject(HackerNewsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch stories page with correct pagination', () => {
        const mockStories: Story[] = [
            { id: 1, title: 'Story 1', url: 'http://test.com/1', time: 1234567890, type: 'story', by: 'user1', score: 100 },
            { id: 2, title: 'Story 2', url: 'http://test.com/2', time: 1234567891, type: 'story', by: 'user2', score: 200 },
            { id: 3, title: 'Story 3', url: 'http://test.com/3', time: 1234567892, type: 'story', by: 'user3', score: 300 },
            { id: 4, title: 'Story 4', url: 'http://test.com/4', time: 1234567893, type: 'story', by: 'user4', score: 400 },
            { id: 5, title: 'Story 5', url: 'http://test.com/5', time: 1234567894, type: 'story', by: 'user5', score: 500 }
        ];
        const totalStories = 10; // Toplam hikaye sayısı

        // Mock API yanıtı
        const mockResponse = { stories: mockStories, total: totalStories };

        service.getStoriesPage(1, 5).subscribe(response => {
            expect(response.stories.length).toBe(5);
            expect(response.total).toBe(totalStories);
            expect(response.stories).toEqual(mockStories);
        });

        const req = httpMock.expectOne('https://hackernews-brebgba9emg3acgg.ukwest-01.azurewebsites.net/api/Stories/page?page=1&pageSize=5');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});