import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { ItemBestSellerInterface } from 'src/app/interfaces/sales';
import { ProductService } from 'src/app/services/product.service';
import { ProductFilterSerializer, ProductPaginationInterface } from 'src/app/interfaces/products';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public items: ItemBestSellerInterface[];
  public products: ProductPaginationInterface;

  constructor(
    public userService: UserService,
    private itemService: ItemService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.outOfStockProduct();
    this.bestSellerItem();
  }

  public bestSellerItem() {
    const sub = this.itemService.bestSeller().subscribe(
      (response: ItemBestSellerInterface[]) => {
        this.items = response;
        sub.unsubscribe();
      },
      (error: any) => {
        console.log(error);
        sub.unsubscribe();
        alert(error);
      }
    );
  }

  public outOfStockProduct() {
    const filter: ProductFilterSerializer = new ProductFilterSerializer();
    filter.stock__lte = '1';
    const sub = this.productService.search('', filter).subscribe(
      (response: ProductPaginationInterface) => {
        this.products = response;
        sub.unsubscribe();
      }, 
      (error: any) => {
        console.log(error);
        sub.unsubscribe();
        alert(error);
      }
    );
  }

  public paginateProduct(cursor: string) {
    this.productService.paginate(cursor).subscribe(
      (response) => {
        this.products.results.push(...response.results)
        this.products.next = response.next;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

}

