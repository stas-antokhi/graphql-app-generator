import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GraphqlAppsComponent } from './components/graphql-apps/graphql-apps-list/graphql-apps.component';
import { GraphqlAppCreateComponent } from './components/graphql-apps/graphql-app-create/graphql-app-create.component';
import { GraphqlAppEditComponent } from './components/graphql-apps/graphql-app-edit/graphql-app-edit.component';
import { NavComponent } from './shared/components/nav/nav.component';

import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FooterComponent } from './shared/components/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { AppCardComponent } from './components/graphql-apps/gql-app-card/app-card.component';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GQLFieldComponent } from './shared/components/gql-field/gql-field.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GraphqlAppsComponent,
    GraphqlAppCreateComponent,
    GraphqlAppEditComponent,
    NavComponent,
    FooterComponent,
    AppCardComponent,
    GQLFieldComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
