import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductInterface } from 'src/app/interfaces/products';
import { ProductMultichoiceComponent } from 'src/app/popups/product-multichoice/product-multichoice.component';
import { forkJoin } from 'rxjs';
import { CartInterface, CartPaginationInterface } from 'src/app/interfaces/sales';
import { CartSerializer } from 'src/app/interfaces/carts';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit, OnDestroy {
  public carts: CartPaginationInterface;

  constructor(
    private modalService: NgbModal,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.allCart();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy(): void {
    if (this.carts.results.length > 0) {
      alert("You haven't finished it yet. Unsaved data will be deleted!");
      
      this.cartService.clear().subscribe(
        (response: any) => {},
        (error: any) => {
          console.log(error);
          alert(error);
        }
      )
    }
  }

  public browseProducts() {
    this.modalService.open(ProductMultichoiceComponent).result.then(
      (products: ProductInterface[]) => {
        console.log(products);
        let requests = [];
        for (let product of products) {
          requests.push(this.cartService.create( 
              (new CartSerializer()).productToCart(product) 
            ).pipe( tap(res => console.log(res)) )
          );
        }

        forkJoin(requests).subscribe(
          (allResults) => {
            this.allCart();
          },
          (allErrors) => {
            console.log(allErrors);
          }
        )
      },
      (dismis: boolean) => {
        console.log(dismis);
      }
    );
  }

  public allCart() {
    this.cartService.all().subscribe(
      (carts: CartPaginationInterface) => {
        this.carts = carts;
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public updateCart(cart: CartInterface) {
    cart.subtotal = cart.quantity * cart.price;

    this.cartService.update(cart).subscribe(
      (response: CartInterface) => {
        if (response.quantity == 0) {
          this.cartService.delete(response.id).subscribe(
            (response: any) => {
              this.allCart();
            },
            (error) => {
              console.log(error);
              alert(error);
            }
          )
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    )
  }

}
