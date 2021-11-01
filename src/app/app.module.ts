import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GraphqlAppsComponent } from './components/graphql-apps/graphql-apps-list/graphql-apps.component';
import { NavComponent } from './shared/components/nav/nav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { AppCardComponent } from './components/graphql-apps/gql-app-card/app-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GraphqlAppComponent } from './components/graphql/graphql-app/graphql-app.component';
import { GraphqlDescriptorComponent } from './components/graphql/graphql-descriptor/graphql-descriptor.component';
import { GraphqlMappingsComponent } from './components/graphql/graphql-mappings/graphql-mappings.component';
import {
  GraphqlSchemaEditorComponent,
  SchemaParseErrorDialog,
} from './components/graphql/graphql-schema-editor/graphql-schema-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { monacoConfig } from './monaco-config/monaco-editor-config';
import { MatRadioModule } from '@angular/material/radio';
import { MappingsErrorDialog } from './components/graphql/graphql-mappings/graphql-mappings.component';
import { GraphqlCreateComponent } from './components/graphql-apps/graphql-create/graphql-create.component';
import { GraphqlEditComponent } from './components/graphql-apps/graphql-edit/graphql-edit.component';
import { ConfirmActionDialogComponent } from './shared/components/confirm-action-dialog/confirm-action-dialog.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GraphqlAppsComponent,
    NavComponent,
    FooterComponent,
    AppCardComponent,
    GraphqlAppComponent,
    GraphqlDescriptorComponent,
    GraphqlMappingsComponent,
    GraphqlSchemaEditorComponent,
    SchemaParseErrorDialog,
    MappingsErrorDialog,
    GraphqlCreateComponent,
    GraphqlEditComponent,
    ConfirmActionDialogComponent,
    PageHeaderComponent,
  ],
  imports: [
    FormsModule,
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
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  entryComponents: [SchemaParseErrorDialog, MappingsErrorDialog],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
