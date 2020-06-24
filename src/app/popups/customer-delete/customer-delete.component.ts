import { Component, OnInit, Input } from '@angular/core';
import { CustomerInterface, CustomerSerializer } from 'src/app/interfaces/customers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  @Input() customer: CustomerInterface = new CustomerSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  public delete() {
    this.customerService.delete(this.customer.id).subscribe(
      (response: any) => {
        this.activeModal.close(true);
      },
      (error) => {
        this.activeModal.dismiss(false);
      }
    );
  }

}
