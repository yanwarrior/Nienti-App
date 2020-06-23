import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MegaMenuItem } from 'primeng/api/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Suppliers',
        icon: 'pi pi-refresh',
        command: () => {
          this.router.navigate(['suppliers'])
        }
      },
      {
        label: 'Customers',
        icon: 'pi pi-refresh',
        command: () => {
          this.router.navigate(['products'])
        }
      },
      {
        label: 'Products',
        icon: 'pi pi-refresh',
        command: () => {
          this.router.navigate(['products'])
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-refresh',
        command: () => {
          this.router.navigate(['login'])
        }
      }
    ]
  }

  constructor(public router: Router) { }

  
}
