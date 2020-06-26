import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierPaginationInterface, SupplierInterface, SupplierSerializer } from 'src/app/interfaces/suppliers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierCreateComponent } from 'src/app/popups/supplier-create/supplier-create.component';
import { SupplierEditComponent } from 'src/app/popups/supplier-edit/supplier-edit.component';
import { SupplierDeleteComponent } from 'src/app/popups/supplier-delete/supplier-delete.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  public suppliers: SupplierPaginationInterface;
  public isEmpty: boolean = true;
  public query: string = '';
  public cursor: string;

  constructor(
    private supplierService: SupplierService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.supplierService.all().subscribe(
      (response) => {
        if (response.results.length > 0) {
          this.suppliers = response;
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public search() {
    this.supplierService.search(this.query).subscribe(
      (response) => {
        this.suppliers = response;
        if (response.results.length > 0) {
          this.isEmpty = false;
          this.cursor = response.next;
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }
  
  public paginate(cursor: string) {
    this.supplierService.paginate(cursor).subscribe(
      (response) => {
        this.suppliers.results.push(...response.results);
        this.suppliers.next = response.next;
        if (response.results.length > 0) {
          this.isEmpty = false;
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public create() {
    this.modalService.open(SupplierCreateComponent).result.then(
      (result) => {
        this.all();
      },
      (reason) => {
        console.log(reason);
      }
    )
  }

  public update(supplier: SupplierInterface) {
    const modalRef = this.modalService.open(SupplierEditComponent);
    modalRef.componentInstance.supplier = supplier;
  }

  public delete(supplier: SupplierInterface) {
    const modalRef = this.modalService.open(SupplierDeleteComponent);
    modalRef.componentInstance.supplier = supplier;

    modalRef.result.then(
      (deleted) => {
        if (deleted) {
          this.all();
        }
      }
    );
  }

}
