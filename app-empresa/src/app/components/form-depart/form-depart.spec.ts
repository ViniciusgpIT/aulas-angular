import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDepart } from './form-depart';

describe('FormDepart', () => {
  let component: FormDepart;
  let fixture: ComponentFixture<FormDepart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDepart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDepart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
