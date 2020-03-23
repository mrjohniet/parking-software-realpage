import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingModuleComponent } from './parking-module.component';

describe('ParkingModuleComponent', () => {
  let component: ParkingModuleComponent;
  let fixture: ComponentFixture<ParkingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
