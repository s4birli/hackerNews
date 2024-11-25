import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term after debounce time', fakeAsync(() => {
    const searchTerm = 'test search';
    let emittedTerm = '';
    
    component.searchChange.subscribe((term: string) => {
      emittedTerm = term;
    });

    const input = fixture.nativeElement.querySelector('input');
    input.value = searchTerm;
    input.dispatchEvent(new Event('input'));

    tick(300); // Wait for debounce time

    expect(emittedTerm).toBe(searchTerm);
  }));

  it('should not emit if search term is the same', fakeAsync(() => {
    let emitCount = 0;
    component.searchChange.subscribe(() => emitCount++);

    const input = fixture.nativeElement.querySelector('input');
    
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(300);

    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(300);

    expect(emitCount).toBe(1);
  }));
});