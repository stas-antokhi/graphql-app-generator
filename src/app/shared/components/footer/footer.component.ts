import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [],
  template: `
    <footer class="bg-primary-500 flex items-center" style="min-height: 60px">
      <div class="mx-auto container flex justify-center items-center">
        <p class="text-white">Deleveloped by Stas with <mat-icon inline="true" color="warn">favorite</mat-icon> at SoftInstigate</p>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
