import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGestores } from './lista-gestores';

describe('ListaGestores', () => {
  let component: ListaGestores;
  let fixture: ComponentFixture<ListaGestores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGestores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGestores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
