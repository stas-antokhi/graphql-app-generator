import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <div class="flex text-center" [class.flex-col]="align === 'vertical'">


      <a
        *ngFor="let page of pages"
        [routerLink]="page.path"
        class="uppercase py-3 px-2 sm:pl-8 sm:pr-6 sm:py-0 hover:text-accent-500"
      >
        {{ page.name }}
      </a>


    </div>
  `,
  styles: []
})
export class NavComponent implements OnInit {

  @Input() align: 'vertical' | 'horizontal' = 'horizontal';

  pages: {name: string; path: string; }[] = [
    {name: 'Apps', path: '/apps'}
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
