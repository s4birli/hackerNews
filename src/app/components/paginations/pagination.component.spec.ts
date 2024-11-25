import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable previous button on first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    
    const prevButton = fixture.nativeElement.querySelector('button:first-child');
    expect(prevButton.disabled).toBe(true);
  });

  it('should disable next button on last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;
    fixture.detectChanges();
    
    const nextButton = fixture.nativeElement.querySelector('button:last-child');
    expect(nextButton.disabled).toBe(true);
  });

  it('should emit correct page number when clicking next', () => {
    component.currentPage = 1;
    component.totalPages = 5;
    let emittedPage = 0;
    
    fixture.detectChanges();
    
    component.pageChange.subscribe((page: number) => {
      emittedPage = page;
    });

    const nextButton = fixture.debugElement.query(el => el.nativeElement.textContent.trim() === 'Next');
    nextButton.triggerEventHandler('click', null);
    
    expect(emittedPage).toBe(2);
  });

  it('should emit correct page number when clicking previous', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    let emittedPage = 0;
    
    fixture.detectChanges();
    
    component.pageChange.subscribe((page: number) => {
      emittedPage = page;
    });

    const prevButton = fixture.debugElement.query(el => el.nativeElement.textContent.trim() === 'Previous');
    prevButton.triggerEventHandler('click', null);
    
    expect(emittedPage).toBe(1);
  });
});