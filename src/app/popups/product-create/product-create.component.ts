import { Component, OnInit } from '@angular/core';
import { ProductInterface, ProductSerializer } from 'src/app/interfaces/products';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public product: ProductInterface = new ProductSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  public create() {
    this.productService.create(this.product).subscribe(
      (response: ProductInterface) => {
        this.activeModal.close(true);
      },
      (error: any) => {
        console.log(error);
        this.activeModal.dismiss(false);
        alert(error);
      }
    )
  }

}
