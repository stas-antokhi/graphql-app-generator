import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/graphql';

@Component({
  selector: 'app-graphql-apps',
  templateUrl: './graphql-apps.component.html',
  styleUrls: ['./graphql-apps.component.scss']
})
export class GraphqlAppsComponent implements OnInit {

  apps$!: Observable<Graphql.App[]>;

  constructor(private gqlSvc: GraphqlAppsService) { }

  ngOnInit(): void {
    this.apps$ = this.gqlSvc.getAllApps();
  }

}
