import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierInterface, SupplierSerializer } from 'src/app/interfaces/suppliers';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  public supplier: SupplierInterface = new SupplierSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
  }

  public create() {
    this.supplierService.create(this.supplier)
      .subscribe(
        (response: SupplierInterface) => {
          this.activeModal.close(response);
        },
        (error: any) => {
          this.activeModal.close(error);
        }
      )
  }

}
