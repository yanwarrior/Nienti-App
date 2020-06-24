import { Component, OnInit } from '@angular/core';
import { CustomerInterface, CustomerSerializer } from 'src/app/interfaces/customers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  public customer: CustomerInterface = new CustomerSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  public create() {
    this.customerService.create(this.customer).subscribe(
      (response: CustomerInterface) => {
        this.activeModal.close(true);
      },
      (error: any) => {
        console.log(error);
        this.activeModal.dismiss(false);
        alert(error);
      }
    );
  }

}
