import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nienti-app';
  public menuItems: MenuItem[] = [
    {
      label: 'Module Masters',
      items: [
        {label: 'Suppliers', icon: 'pi pi-fw pi-plus', routerLink: ['/suppliers']},
        {label: 'Customers', icon: 'pi pi-fw pi-download', routerLink: ['/products']},
        {label: 'Products', icon: 'pi pi-fw pi-download', routerLink: ['/products']},
      ]
    },
    {
      label: 'Module Transactions',
      items: [
          {label: 'Purchasing', icon: 'pi pi-fw pi-plus'},
          {label: 'Sales', icon: 'pi pi-fw pi-download'}
      ]
    },
    {
      label: 'Module Reporting',
      items: [
          {label: 'Supplier Report', icon: 'pi pi-fw pi-plus'},
          {label: 'Customer Report', icon: 'pi pi-fw pi-download'},
          {label: 'Product Report', icon: 'pi pi-fw pi-download'},
      ]
    }
  ];
}
