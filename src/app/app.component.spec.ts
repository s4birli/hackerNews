import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct title', () => {
    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('header h1');
    expect(header.textContent).toContain('Hacker News Viewer');
  });

  it('should render footer with correct text', () => {
    const compiled = fixture.nativeElement;
    const footer = compiled.querySelector('footer p');
    expect(footer.textContent).toContain('Hacker News Viewer - Built with Angular');
  });
});
