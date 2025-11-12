import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFunc } from './form-func';

describe('FormFunc', () => {
  let component: FormFunc;
  let fixture: ComponentFixture<FormFunc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFunc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFunc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
