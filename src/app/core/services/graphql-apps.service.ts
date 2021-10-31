import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Injectable({
  providedIn: 'root'
})
export class GraphqlAppsService {

  private mockURL = 'http://localhost:8080/gql-apps';
  headers = {'Authorization': 'Basic ' + btoa('admin:secret')}

  constructor(private http: HttpClient) { }

  getAllApps(): Observable<any> {
    return this.http.get(this.mockURL, { headers: this.headers});
  }

  createApp(data: Graphql.App): Observable<HttpResponse<any>> {
    return this.http.post(this.mockURL, data, {
      observe: 'response',
      headers: this.headers
    });
  }
}
