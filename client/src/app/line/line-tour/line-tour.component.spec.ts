import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTourComponent } from './line-tour.component';

describe('LineTourComponent', () => {
  let component: LineTourComponent;
  let fixture: ComponentFixture<LineTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
