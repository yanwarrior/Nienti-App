import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { NgbActiveModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SaleReportSerializer } from 'src/app/interfaces/sales';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate;
  public toDate: NgbDate | null = null;
  public query: string = '';

  constructor(
    private saleService: SaleService,
    public activeModal: NgbActiveModal,
    public calendar: NgbCalendar,
    private pdfService: PdfService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  public report() {
    const periodicDate: SaleReportSerializer = new SaleReportSerializer();
    periodicDate.start_date = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
    periodicDate.end_date = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;

    const sub = this.saleService.reports(periodicDate, this.query).subscribe(
      (response: any) => {
        sub.unsubscribe();
        this.pdfService.print(response);
        this.activeModal.close(true);
      },
      (error: any) => {
        sub.unsubscribe();
        this.activeModal.dismiss(false);
      }
    );
  }
}
