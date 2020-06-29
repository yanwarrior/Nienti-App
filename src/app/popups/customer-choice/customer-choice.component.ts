import { Component, OnInit } from '@angular/core';
import { CustomerInterface, CustomerPaginationInterface } from 'src/app/interfaces/customers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-choice',
  templateUrl: './customer-choice.component.html',
  styleUrls: ['./customer-choice.component.css']
})
export class CustomerChoiceComponent implements OnInit {
  public customers: CustomerPaginationInterface;
  public customer: CustomerInterface;

  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.customerService.all().subscribe(
      (response: CustomerPaginationInterface) => {
        this.customers = response;
      },
      (error: any) => {
        console.log(error);
        this.activeModal.dismiss(false);
        alert(error);
      }
    );
  }

  public add(customer: CustomerInterface) {
    this.customer = customer;
  }

  public done() {
    this.activeModal.close(this.customer);
  }
}
