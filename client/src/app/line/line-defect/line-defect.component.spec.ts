import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDefectComponent } from './line-defect.component';

describe('LineDefectComponent', () => {
  let component: LineDefectComponent;
  let fixture: ComponentFixture<LineDefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineDefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
