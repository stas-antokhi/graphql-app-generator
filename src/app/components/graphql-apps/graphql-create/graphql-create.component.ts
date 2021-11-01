import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/GraphQLApp';
import { GraphqlAppComponent } from '../../graphql/graphql-app/graphql-app.component';

@Component({
  selector: 'app-graphql-create',
  templateUrl: './graphql-create.component.html',
  styleUrls: ['./graphql-create.component.scss']
})
export class GraphqlCreateComponent implements OnInit {

  @ViewChild('app') app!: GraphqlAppComponent;

  constructor(
    private graphqlSvc: GraphqlAppsService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  createApp() {
    if(this.app.isDescriptorFormValid && this.app.isSchemaValid && this.app.isMappingsValid) {

      const app: Graphql.App = this.app.getApp();

      console.log(app);

      this.graphqlSvc.createApp(app).subscribe(resp => {
        if(resp.status === 201) {
          this.router.navigate(['apps']);
        }
      });

    }
  }

}
