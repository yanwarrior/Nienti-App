import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductPaginationInterface, ProductInterface, ProductSerializer } from 'src/app/interfaces/products';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-multichoice',
  templateUrl: './product-multichoice.component.html',
  styleUrls: ['./product-multichoice.component.css']
})
export class ProductMultichoiceComponent implements OnInit {
  public products: ProductPaginationInterface;
  public query: string;
  public productChecked: Array<ProductInterface>;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.productService.choices().subscribe(
      (response: ProductPaginationInterface) => {
        this.products = response;
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public search() {
    this.productService.searchChoices(this.query).subscribe(
      (response: ProductPaginationInterface) => {
        this.products = response;
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    )
  }

  public add(event:any, product: ProductInterface) {
    if (!this.productChecked) {
      this.productChecked = Array<ProductSerializer>();
    }

    if (event.target.checked) {
      this.productChecked.push(product);
    } else {
      this.productChecked = this.productChecked.filter(obj => obj !== product);
    }
  }

  public addToOrder() {
    this.activeModal.close(this.productChecked);
  }

}
