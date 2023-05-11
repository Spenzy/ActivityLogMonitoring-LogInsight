import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentalAnalysisComponent } from './sentimental-analysis.component';

describe('SentimentalAnalysisComponent', () => {
  let component: SentimentalAnalysisComponent;
  let fixture: ComponentFixture<SentimentalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentalAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
