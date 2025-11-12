import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepartamento } from './lista-departamento';

describe('ListaDepartamento', () => {
  let component: ListaDepartamento;
  let fixture: ComponentFixture<ListaDepartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDepartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDepartamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
