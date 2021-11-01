import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-header[title]',
  styles: [],
  template: `
  <div class=" sm:flex sm:my-6 sm:items-center mx-4">
    <button class="text-left mb-6 sm:mb-0 sm:w-1/3 flex items-center" mat-icon-button (click)="navigateBack()">
      <mat-icon inline=true class="text-2xl">arrow_back</mat-icon>
    </button>
    <h1 class="mb-6 sm:mb-0 sm:w-1/3 p-0 m-0">{{title}}</h1>
  </div>
  `
})
export class PageHeaderComponent implements OnInit {

  @Input() title!: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }

}
