import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVini } from './app-vini';

describe('AppVini', () => {
  let component: AppVini;
  let fixture: ComponentFixture<AppVini>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppVini]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVini);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
