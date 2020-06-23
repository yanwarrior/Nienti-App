import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface, ProductSerializer } from 'src/app/interfaces/products';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  @Input() product: ProductInterface = new ProductSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  public delete() {
    this.productService.delete(this.product.id).subscribe(
      (response: any) => {
        this.activeModal.close(true);
      },
      (error: any) => {
        this.activeModal.dismiss(false);
      }
    );
  }

}
