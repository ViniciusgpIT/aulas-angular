import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVagas } from './form-vagas';

describe('FormVagas', () => {
  let component: FormVagas;
  let fixture: ComponentFixture<FormVagas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVagas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVagas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
