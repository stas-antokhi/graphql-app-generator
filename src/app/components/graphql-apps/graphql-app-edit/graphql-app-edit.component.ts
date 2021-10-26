import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphql-app-edit',
  templateUrl: './graphql-app-edit.component.html',
  styleUrls: ['./graphql-app-edit.component.scss']
})
export class GraphqlAppEditComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ID: ', this.router.snapshot.params.id);
  }

}
