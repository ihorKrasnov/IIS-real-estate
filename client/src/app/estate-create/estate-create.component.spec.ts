import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateCreateComponent } from './estate-create.component';

describe('EstateCreateComponent', () => {
  let component: EstateCreateComponent;
  let fixture: ComponentFixture<EstateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
