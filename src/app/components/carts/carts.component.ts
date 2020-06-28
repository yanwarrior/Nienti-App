import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartInterface } from 'src/app/interfaces/sales';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductPaginationInterface, ProductInterface, ProductSerializer } from 'src/app/interfaces/products';
import { CartSerializer } from 'src/app/interfaces/carts';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  @Output() outUpdate: EventEmitter<CartInterface> = new EventEmitter<CartInterface>();

  public products: ProductPaginationInterface;
  public productTemps: ProductInterface[];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.allProduct();
  }

  public allProduct() {
    this.productService.all().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public searchProduct() {}
  public update() {}
  public create(product: ProductInterface) {
    const cart: CartSerializer = new CartSerializer();
    cart.product = product.id;
    cart.name = product.name;
    cart.unit = product.unit;
    cart.price = product.price;
    cart.stock = product.stock;
    cart.quantity = 1;

    if (cart.isValidStock()) {
      console.log('Stock valid');
    } else {
      alert('Stock not enough!');
    }
  }

}
