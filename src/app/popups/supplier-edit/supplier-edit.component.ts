import { Component, OnInit, Input } from '@angular/core';
import { SupplierInterface } from 'src/app/interfaces/suppliers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  @Input() supplier: SupplierInterface;

  constructor(
    public activeModal: NgbActiveModal,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
  }

  public update() {
    this.supplierService.update(this.supplier)
      .subscribe(
        (response: SupplierInterface) => {
          this.activeModal.close(response);
        },
        (error: any) => {
          this.activeModal.close(error);
        }
      );
  }

}
