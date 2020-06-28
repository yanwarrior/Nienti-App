import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMultichoiceComponent } from './product-multichoice.component';

describe('ProductMultichoiceComponent', () => {
  let component: ProductMultichoiceComponent;
  let fixture: ComponentFixture<ProductMultichoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMultichoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMultichoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
