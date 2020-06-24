import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerPaginationInterface, CustomerInterface } from 'src/app/interfaces/customers';
import { CustomerEditComponent } from 'src/app/popups/customer-edit/customer-edit.component';
import { CustomerCreateComponent } from 'src/app/popups/customer-create/customer-create.component';
import { CustomerDeleteComponent } from 'src/app/popups/customer-delete/customer-delete.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public customers: CustomerPaginationInterface;
  public query: string = '';

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.customerService.all().subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public search() {
    this.customerService.search(this.query).subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public paginate(cursor: string) {
    this.customerService.paginate(cursor).subscribe(
      (response) => {
        this.customers.results.push(...response.results);
        this.customers.next = response.next;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public create() {
    this.modalService.open(CustomerCreateComponent).result.then(
      (result) => {
        this.all();
      },
      (dismiss) => {
        console.log(dismiss);
      }
    )
  }

  public update(customer: CustomerInterface) {
    const modalRef = this.modalService.open(CustomerEditComponent);
    modalRef.componentInstance.customer = customer;
  }

  public delete(customer: CustomerInterface) {
    const modalRef = this.modalService.open(CustomerDeleteComponent);
    modalRef.componentInstance.customer = customer;

    modalRef.result.then(
      (close) => {
        this.all();
      }
    );
  }
}
