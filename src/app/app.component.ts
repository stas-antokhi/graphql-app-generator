import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showSideNav: boolean = false;
  title = 'GraphQL app manager';

  constructor(private breakpoint: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.XSmall)
    .subscribe(result => this.showSideNav = result.matches)
  }
}
