import { Component, OnInit, Input } from '@angular/core';
import { CustomerInterface, CustomerSerializer } from 'src/app/interfaces/customers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @Input() customer: CustomerInterface = new CustomerSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  public update() {
    this.customerService.update(this.customer).subscribe(
      (response: CustomerInterface) => {
        this.activeModal.close(true);
      },
      (error: any) => {
        this.activeModal.dismiss(false);
      }
    )
  }

}
