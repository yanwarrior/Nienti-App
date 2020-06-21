import { Component, OnInit } from '@angular/core';
import { ProductPaginationInterface } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: ProductPaginationInterface;
  public isEmpty: boolean = true;
  public query: string = '';
  public cursor: string;

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
        if (response.results.length > 0) {
          this.isEmpty = false;
          this.cursor = response.next;
        }
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
        if (response.results.length > 0) {
          this.isEmpty = false;
          this.cursor = response.next;
        }
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
        if (response.results.length > 0) {
          this.isEmpty = false;
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

}
