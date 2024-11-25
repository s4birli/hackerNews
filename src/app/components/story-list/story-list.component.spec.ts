import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../../services/hacker-news.service';
import { of, throwError } from 'rxjs';
import { Story } from '../../models/story.model';

describe('StoryListComponent', () => {
    let component: StoryListComponent;
    let fixture: ComponentFixture<StoryListComponent>;
    let mockHackerNewsService: jasmine.SpyObj<HackerNewsService>;

    const mockStories: Story[] = [
        {
            id: 1,
            title: 'Test Story 1',
            url: 'http://test1.com',
            time: 1234567890,
            by: 'user1',
            score: 100,
            type: 'story'
        },
        {
            id: 2,
            title: 'Test Story 2',
            url: 'http://test2.com',
            time: 1234567891,
            by: 'user2',
            score: 200,
            type: 'story'
        }
    ];

    beforeEach(async () => {
        mockHackerNewsService = jasmine.createSpyObj('HackerNewsService', ['getStoriesPage']);
        mockHackerNewsService.getStoriesPage.and.returnValue(of({ stories: mockStories, total: 2 }));

        await TestBed.configureTestingModule({
            imports: [StoryListComponent],
            providers: [
                { provide: HackerNewsService, useValue: mockHackerNewsService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load stories on init', () => {
        expect(mockHackerNewsService.getStoriesPage).toHaveBeenCalledWith(1, 5);
        expect(component.stories).toEqual(mockStories);
        expect(component.loading).toBeFalse();
    });

    it('should handle error when loading stories fails', () => {
        mockHackerNewsService.getStoriesPage.and.returnValue(throwError(() => new Error('API Error')));
        component.loadStories();
        fixture.detectChanges();

        expect(component.error).toBe('Failed to load stories. Please try again later.');
        expect(component.loading).toBeFalse();
    });

    it('should filter stories based on search term', () => {
        component.stories = mockStories;
        component.onSearch('Story 1');

        expect(component.filteredStories.length).toBe(1);
        expect(component.filteredStories[0].title).toBe('Test Story 1');
    });

    it('should load new page when page changes', () => {
        component.onPageChange(2);

        expect(mockHackerNewsService.getStoriesPage).toHaveBeenCalledWith(2, 5);
        expect(component.currentPage).toBe(2);
    });

    it('should reset to page 1 when searching', () => {
        component.currentPage = 2;
        component.onSearch('test');

        expect(component.currentPage).toBe(1);
    });

    it('should show all stories when search term is empty', () => {
        component.stories = mockStories;
        component.onSearch('');

        expect(component.filteredStories.length).toBe(2);
        expect(component.filteredStories).toEqual(mockStories);
    });

    it('should handle undefined title when filtering stories', () => {
        const storiesWithUndefinedTitle: Story[] = [
            {
                id: 3,
                title: undefined,
                url: 'http://test3.com',
                time: 1234567892,
                by: 'user3',
                score: 300,
                type: 'story'
            },
            ...mockStories
        ];

        component.stories = storiesWithUndefinedTitle;
        component.onSearch('test');

        expect(component.filteredStories.length).toBe(2);
        expect(component.filteredStories).toEqual(mockStories);
    });

    it('should handle null search term', () => {
        component.stories = mockStories;
        component.searchTerm = null as any;
        component['applyFilter']();

        expect(component.filteredStories).toEqual(mockStories);
    });
});