import { Component, OnInit } from '@angular/core';
import { ProductPaginationInterface, ProductInterface } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCreateComponent } from 'src/app/popups/product-create/product-create.component';
import { ProductEditComponent } from 'src/app/popups/product-edit/product-edit.component';
import { ProductDeleteComponent } from 'src/app/popups/product-delete/product-delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: ProductPaginationInterface;
  public query: string = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.productService.all().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public search() {
    this.productService.search(this.query).subscribe(
      (response) => {
        this.products = response;
      },  
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public paginate(cursor: string) {
    this.productService.paginate(cursor).subscribe(
      (response) => {
        this.products.results.push(...response.results);
        this.products.next = response.next;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public create() {
    this.modalService.open(ProductCreateComponent).result.then(
      (result) => {
        this.all();
      },
      (reason) => {
        // This reason must be definition
        // because error when i not definition
        console.log(reason);
      }
    );
  }

  public update(product: ProductInterface) {
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = product;
  }

  public delete(product: ProductInterface) {
    const modalRef = this.modalService.open(ProductDeleteComponent);
    modalRef.componentInstance.product = product;

    modalRef.result.then(
      (close: boolean) => {
        this.all();
      }
    )
  }
}
