import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'app-graphql-apps',
  templateUrl: './graphql-apps.component.html',
  styleUrls: ['./graphql-apps.component.scss']
})
export class GraphqlAppsComponent implements OnInit {

  apps$: BehaviorSubject<Graphql.App[]> = new BehaviorSubject<Graphql.App[]>([]);


  constructor(private graphqlSvc: GraphqlAppsService) { }

  ngOnInit(): void {
    this.graphqlSvc.getAllApps().subscribe(
      apps => this.apps$.next(apps),
      err => console.error('Error while trying to fetch apps', err)
    );
  }

  deleteApp(data: { $oid: string}) {
    this.graphqlSvc.deleteApp(data.$oid).subscribe(resp => {
      if(resp.status === 204) {
        this.apps$.next(this.apps$.getValue().filter(app => app._id?.$oid !== data.$oid));
      }
    })
  }

}
