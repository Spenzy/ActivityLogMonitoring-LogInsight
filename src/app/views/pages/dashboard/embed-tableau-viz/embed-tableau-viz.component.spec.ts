import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedTableauVizComponent } from './embed-tableau-viz.component';

describe('EmbedTableauVizComponent', () => {
  let component: EmbedTableauVizComponent;
  let fixture: ComponentFixture<EmbedTableauVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedTableauVizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbedTableauVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
