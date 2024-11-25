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

    it('should fetch new stories', () => {
        const mockStoryIds = [1, 2, 3, 4, 5];

        service.getNewStories().subscribe(stories => {
            expect(stories).toEqual(mockStoryIds);
        });

        const req = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/newstories.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockStoryIds);
    });
    it('should fetch a single story', () => {
        const mockStory: Story = {
            id: 1,
            title: 'Test Story',
            url: 'http://test.com',
            time: 1234567890,
            type: 'story',
            by: 'testuser',
            score: 100
        };

        service.getStory(1).subscribe(story => {
            expect(story).toEqual(mockStory);
        });

        const req = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/item/1.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockStory);
    });

    it('should fetch stories page with correct pagination', () => {
        const mockStoryIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const mockStories: Story[] = mockStoryIds.map(id => ({
            id,
            title: `Story ${id}`,
            url: `http://test.com/${id}`,
            time: 1234567890,
            type: 'story',
            by: 'testuser',
            score: 100
        }));

        service.getStoriesPage(1, 5).subscribe(response => {
            expect(response.stories.length).toBe(5);
            expect(response.total).toBe(mockStoryIds.length);
        });

        const reqIds = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/newstories.json');
        reqIds.flush(mockStoryIds);

        mockStoryIds.slice(0, 5).forEach(id => {
            const req = httpMock.expectOne(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            req.flush(mockStories[id - 1]);
        });
    });
});