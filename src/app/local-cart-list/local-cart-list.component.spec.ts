import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCartListComponent } from './local-cart-list.component';

describe('LocalCartListComponent', () => {
  let component: LocalCartListComponent;
  let fixture: ComponentFixture<LocalCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalCartListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
