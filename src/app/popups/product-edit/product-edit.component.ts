import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface, ProductSerializer } from 'src/app/interfaces/products';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() product: ProductInterface = new ProductSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  public update() {
    this.productService.update(this.product)
      .subscribe(
        (response: ProductInterface) => {
          this.activeModal.close(true);
        },
        (error: any) => {
          this.activeModal.dismiss(false);
        }
      )
  }

}
