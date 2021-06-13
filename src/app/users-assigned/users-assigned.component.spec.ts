import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAssignedComponent } from './users-assigned.component';

describe('UsersAssignedComponent', () => {
  let component: UsersAssignedComponent;
  let fixture: ComponentFixture<UsersAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
