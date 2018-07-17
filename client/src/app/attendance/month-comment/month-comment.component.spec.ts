import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCommentComponent } from './month-comment.component';

describe('MonthCommentComponent', () => {
  let component: MonthCommentComponent;
  let fixture: ComponentFixture<MonthCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
