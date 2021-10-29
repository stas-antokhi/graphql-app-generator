import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphqlAppCreateComponent } from './components/graphql-apps/graphql-app-create/graphql-app-create.component';
import { GraphqlAppEditComponent } from './components/graphql-apps/graphql-app-edit/graphql-app-edit.component';
import { GraphqlAppsComponent } from './components/graphql-apps/graphql-apps-list/graphql-apps.component';
import { GraphqlAppComponent } from './components/graphql/graphql-app/graphql-app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'apps',
    children: [
      {
        path: '',
        component: GraphqlAppsComponent
      },
      {
        path: 'create',
        component: GraphqlAppCreateComponent
      },
      {
        path: ':id/edit',
        component: GraphqlAppEditComponent
      },
      {
        path: 'test',
        component: GraphqlAppComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
