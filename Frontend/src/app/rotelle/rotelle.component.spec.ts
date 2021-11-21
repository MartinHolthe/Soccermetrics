import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotelleComponent } from './rotelle.component';

describe('RotelleComponent', () => {
  let component: RotelleComponent;
  let fixture: ComponentFixture<RotelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
