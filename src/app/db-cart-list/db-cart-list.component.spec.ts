import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbCartListComponent } from './db-cart-list.component';

describe('DbCartListComponent', () => {
  let component: DbCartListComponent;
  let fixture: ComponentFixture<DbCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbCartListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
