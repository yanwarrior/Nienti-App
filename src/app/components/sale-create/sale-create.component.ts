import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ProductInterface } from 'src/app/interfaces/products';
import { ProductMultichoiceComponent } from 'src/app/popups/product-multichoice/product-multichoice.component';
import { forkJoin } from 'rxjs';
import { CartInterface, CartPaginationInterface } from 'src/app/interfaces/carts';
import { CartSerializer, CartSummaryInterface } from 'src/app/interfaces/carts';
import { tap, debounceTime } from 'rxjs/operators';
import { CustomerChoiceComponent } from 'src/app/popups/customer-choice/customer-choice.component';
import { CustomerInterface } from 'src/app/interfaces/customers';
import { FormControl } from '@angular/forms';
import { SaleInterface, SaleSerializer } from 'src/app/interfaces/sales';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit, OnDestroy {
  public sale: SaleSerializer = new SaleSerializer();
  public carts: CartPaginationInterface;
  public customer: CustomerInterface;
  public cartSummary: CartSummaryInterface;
  public date: NgbDateStruct;

  constructor(
    private modalService: NgbModal,
    private saleService: SaleService,
    private cartService: CartService,
    public calendarService: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.allCart();
    this.date = this.calendarService.getToday();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy(): void {
    if (this.carts.results.length > 0) {
      alert("You haven't finished it yet. Unsaved data will be deleted!");

      const sub = this.cartService.clear().subscribe(
        (response: any) => {
          sub.unsubscribe();
        },
        (error: any) => {
          console.log(error);
          alert(error);
          sub.unsubscribe();
        }
      );
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

        const subs = forkJoin(requests).subscribe(
          (allResults) => {
            this.allCart();
            subs.unsubscribe();
          },
          (allErrors) => {
            console.log(allErrors);
            subs.unsubscribe();
          }
        )
      },
      (dismis: boolean) => {
        console.log(dismis);
      }
    );
  }

  public browseCustomer() {
    this.modalService.open(CustomerChoiceComponent).result.then(
      (close: CustomerInterface) => {
        this.customer = close;
        this.sale.customer = close.id;
      },
      (dismiss: any) => {}
    )
  }

  public allCart() {
    const sub = this.cartService.all().subscribe(
      (carts: CartPaginationInterface) => {
        this.carts = carts;
        this.summaryCart();
        sub.unsubscribe();
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public updateCart(cart: CartInterface) {
    cart.subtotal = cart.quantity * cart.price;
    setTimeout(() => {

      const sub1 = this.cartService.update(cart).subscribe(
        (response: CartInterface) => {
          if (response.quantity == 0) {
            const sub = this.cartService.delete(response.id).subscribe(
              (response: any) => {
                this.allCart();
                sub.unsubscribe();
              },
              (error) => {
                console.log(error);
                alert(error);
                sub.unsubscribe();
              }
            );
            sub1.unsubscribe();
          } else {
            this.allCart();
            sub1.unsubscribe();
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
    }, 1000);
  }

  public summaryCart() {
    const sub = this.cartService.summary().subscribe(
      (response: CartSummaryInterface) => {
        this.cartSummary = response;
        this.sale.total_after = response.summary;
        this.sale.total = response.summary;
        this.sale.calculates();
        sub.unsubscribe();
      },
      (error: any) => {
        console.log(error);
        sub.unsubscribe();
        alert(error);
      }
    );
  }

  public deleteCart(cart: CartInterface) {
    const sub = this.cartService.delete(cart.id).subscribe(
      (response: any) => {
        sub.unsubscribe();
        this.allCart();
      },
      (error: any) => {
        console.log(error);
        sub.unsubscribe();
        alert(error);
      }
    );
  }

  public create() {
    const date = {
      year: this.date.year.toString(),
      month: this.date.month.toString(),
      day: this.date.day.toString()
    }
    this.sale.setSaleDateFromJSON(date);

    const sub = this.saleService.create(this.sale).subscribe(
      (response) => {
        this.allCart();
        this.sale.generateSaleNumber();
        sub.unsubscribe();
      },
      (error) => {
        console.log(error);
        sub.unsubscribe();
        alert(error);
      }
    )
  }

}
