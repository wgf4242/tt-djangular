import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFacilityComponent } from './line-facility.component';

describe('LineFacilityComponent', () => {
  let component: LineFacilityComponent;
  let fixture: ComponentFixture<LineFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
