import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStoriesPageComponent } from './all-stories-page.component';

describe('AllStoriesPageComponent', () => {
  let component: AllStoriesPageComponent;
  let fixture: ComponentFixture<AllStoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
