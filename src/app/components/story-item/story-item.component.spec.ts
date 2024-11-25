import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryItemComponent } from './story-item.component';
import { Story } from '../../models/story.model';

describe('StoryItemComponent', () => {
    let component: StoryItemComponent;
    let fixture: ComponentFixture<StoryItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoryItemComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StoryItemComponent);
        component = fixture.componentInstance;

        component.story = {
            id: 1,
            title: 'Test Story',
            url: 'http://test.com',
            time: 1234567890,
            by: 'testuser',
            score: 100,
            type: 'story'
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display story title as link when URL is present', () => {
        const compiled = fixture.nativeElement;
        const link = compiled.querySelector('a');
        expect(link.textContent.trim()).toBe('Test Story');
        expect(link.href).toBe('http://test.com/');
    });

    it('should display story title without link when URL is not present', () => {
        component.story = {
            ...component.story,
            url: undefined
        };
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        const titleSpan = compiled.querySelector('span');
        expect(titleSpan.textContent).toContain('Test Story');
        expect(titleSpan.textContent).toContain('(Link not available)');
    });

    it('should display story metadata correctly', () => {
        const compiled = fixture.nativeElement;
        const metaItems = compiled.querySelectorAll('.meta-item');

        expect(metaItems[0].textContent).toContain('testuser');
        expect(metaItems[2].textContent).toContain('100 points');
    });
});