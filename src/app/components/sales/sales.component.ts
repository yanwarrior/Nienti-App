import { Component, OnInit } from '@angular/core';
import { SalePaginationInterface, SaleInterface } from 'src/app/interfaces/sales';
import { SaleService } from 'src/app/services/sale.service';
import { PdfService } from 'src/app/services/pdf.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleReportComponent } from 'src/app/popups/sale-report/sale-report.component';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public sales: SalePaginationInterface;
  public query: string = '';

  constructor(
    private saleService: SaleService,
    private pdfService: PdfService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.all();
  }

  public all() {
    this.saleService.all().subscribe(
      (response: SalePaginationInterface) => {
        this.sales = response;
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public search() {
    this.saleService.search(this.query).subscribe(
      (response: SalePaginationInterface) => {
        this.sales = response;
      },  
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public paginate(cursor: string) {
    this.saleService.paginate(cursor).subscribe(
      (response: SalePaginationInterface) => {
        this.sales.results.push(...response.results);
        this.sales.next = response.next;
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public invoice(sale: SaleInterface) {
    this.saleService.invoice(sale.id).subscribe(
      (response: any) => {
        this.pdfService.print(response);
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public deliveryOrders(sale: SaleInterface) {
    this.saleService.deliveryOrders(sale.id).subscribe(
      (response: any) => {
        this.pdfService.print(response);
      },
      (error: any) => {
        console.log(error);
        alert(error);
      }
    );
  }

  public reportSales() {
    this.modalService.open(SaleReportComponent, {scrollable: true});
  }

}
