import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/core/services/credentials.service';

@Component({
  selector: 'app-resthear-credentials',
  styles: ['form { max-width: 500px}'],
  template: `
    <div>
      <h1 class="py-8 text-center">Please provide valid credentials to connect to RESTHeart</h1>

      <p *ngIf="invalidCredentialsMessage" class="mb-6 text-center font-semibold text-red-500">
        {{ invalidCredentialsMessage }}
      </p>

      <form [formGroup]="credentialsForm" class="flex flex-col mx-auto">

        <mat-form-field appearance="fill" class="">
          <mat-label>RESTHeart Url</mat-label>
          <input
            matInput
            [autocomplete]="false"
            placeholder="http://localhost:8080/gql-apps"
            formControlName="url"
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="">
          <mat-label>Username</mat-label>
          <input
            matInput
            [autocomplete]="false"
            placeholder="admin"
            formControlName="username"
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="">
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            [autocomplete]="false"
            placeholder="root"
            formControlName="password"
          />
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="testCredentials()">Next</button>
      </form>


    </div>
  `,
})
export class ResthearCredentialsComponent implements OnInit {
  credentialsForm!: FormGroup;
  invalidCredentialsMessage!: string;

  constructor(
    private fb: FormBuilder,
    private credentialsSvc: CredentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.credentialsForm = this.fb.group({
      url: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  testCredentials() {
    this.credentialsSvc
      .setCredentials(this.credentialsForm.value)
      .subscribe((areValid) => {
        if (areValid) {
          this.router.navigate(['apps']);
        } else {
          console.log('ERRORRRR')
        }
      },
      (err) => {
        console.log('ERROR')
        this.invalidCredentialsMessage = `
        Provided credentials are not valid.
        Please make sure the ${this.credentialsForm.value.username} has the right permissions
        `;
      });
  }
}
