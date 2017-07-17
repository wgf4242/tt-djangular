import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttandenceComponent } from './attendance.component';

describe('AttandenceComponent', () => {
  let component: AttandenceComponent;
  let fixture: ComponentFixture<AttandenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttandenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttandenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
