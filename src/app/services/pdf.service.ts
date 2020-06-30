import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public pdf: any = pdfMake;

  constructor() {
    this.pdf.vfs = pdfFonts.pdfMake.vfs;
  }

  public printInvoice(docDef: any) {
    this.pdf.createPdf(docDef).open();
  }
}
