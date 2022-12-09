import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateproductComponent } from './add-update-product.component';

describe('AddupdateproductComponent', () => {
  let component: AddupdateproductComponent;
  let fixture: ComponentFixture<AddupdateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddupdateproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddupdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
