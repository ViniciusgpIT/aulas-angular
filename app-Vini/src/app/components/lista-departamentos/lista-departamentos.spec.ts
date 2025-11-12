import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepartamentos } from './lista-departamentos';

describe('ListaDepartamentos', () => {
  let component: ListaDepartamentos;
  let fixture: ComponentFixture<ListaDepartamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDepartamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDepartamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
