import { Component, OnInit, Input } from '@angular/core';
import { SupplierInterface, SupplierSerializer } from 'src/app/interfaces/suppliers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.css']
})
export class SupplierDeleteComponent implements OnInit {
  @Input() supplier: SupplierInterface = new SupplierSerializer();

  constructor(
    public activeModal: NgbActiveModal,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
  }

  public delete() {
    this.supplierService.delete(this.supplier.id)
      .subscribe(
        () => {
          this.activeModal.close(true);
        },
        () => {
          this.activeModal.close(false);
        }
      );
  }

}
