import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graphql } from 'src/app/shared/models/GraphQLApp';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class GraphqlAppsService {

  private rhURL = '';
  private headers: any;

  constructor(private http: HttpClient, private credentialSvc: CredentialsService) {
    const {url, username, password} = this.credentialSvc.getCredentials();

    this.rhURL = url;
    this.headers = {'Authorization': 'Basic ' + btoa(`${username}:${password}`)}
  }

  getAllApps(): Observable<Graphql.App[]> {
    return this.http.get<Graphql.App[]>(this.rhURL, {headers: this.headers});
  }

  createApp(data: Graphql.App): Observable<HttpResponse<any>> {
    return this.http.post(this.rhURL, data, {
      observe: 'response',
      headers: this.headers
    });
  }

  deleteApp(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.rhURL}/${id}`, {
      observe: 'response',
      headers: this.headers
    })
  }

  getAppById(id: string): Observable<Graphql.App> {
    return this.http.get<Graphql.App>(`${this.rhURL}/${id}`, {headers: this.headers});
  }

  updateAppById(app: Graphql.App, id: string): Observable<HttpResponse<any>> {
    return this.http.put(`${this.rhURL}/${id}`, app, {
      observe: 'response',
      headers: this.headers
    });
  }
}
