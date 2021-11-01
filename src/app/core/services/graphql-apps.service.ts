import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Injectable({
  providedIn: 'root'
})
export class GraphqlAppsService {

  private mockURL = 'http://localhost:8080/gql-apps';
  private headers = {'Authorization': 'Basic ' + btoa('admin:secret')}

  constructor(private http: HttpClient) { }

  getAllApps(): Observable<Graphql.App[]> {
    return this.http.get<Graphql.App[]>(this.mockURL, { headers: this.headers});
  }

  createApp(data: Graphql.App): Observable<HttpResponse<any>> {
    return this.http.post(this.mockURL, data, {
      observe: 'response',
      headers: this.headers
    });
  }

  deleteApp(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.mockURL}/${id}`, {
      observe: 'response',
      headers: this.headers
    })
  }

  getAppById(id: string): Observable<Graphql.App> {
    return this.http.get<Graphql.App>(`${this.mockURL}/${id}`, {
      headers: this.headers
    });
  }

  updateAppById(app: Graphql.App, id: string): Observable<HttpResponse<any>> {
    return this.http.put(`${this.mockURL}/${id}`, app, {
      headers: this.headers,
      observe: 'response'
    });
  }
}
