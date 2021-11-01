import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/GraphQLApp';
import { GraphqlAppComponent } from '../../graphql/graphql-app/graphql-app.component';

@Component({
  selector: 'app-graphql-edit',
  templateUrl: './graphql-edit.component.html',
  styleUrls: ['./graphql-edit.component.scss']
})
export class GraphqlEditComponent implements OnInit {

  @ViewChild('gqlApp') gqlApp!: GraphqlAppComponent;

  private appId: string = '';
  app!: Observable<Graphql.App>;

  constructor(
    private graphqlSvc: GraphqlAppsService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appId = this.route.snapshot.params.id;
    this.app = this.graphqlSvc.getAppById(this.appId);
  }


  editApp() {
    const updateApp: Graphql.App = this.gqlApp.getApp();

    this.graphqlSvc.updateAppById(updateApp, this.appId).subscribe(resp => {
      if(resp.status === 200) {
        this.snackbar.open('Your app has been successfully updated!', undefined, {duration: 3000});
        this.router.navigate(['apps']);
      }
    });
  }

}
