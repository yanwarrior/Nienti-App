import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public collapsed: boolean = true;

  @Input() title: string = '';

  ngOnInit(): void {
  }

  constructor(public router: Router) { }

  
}
