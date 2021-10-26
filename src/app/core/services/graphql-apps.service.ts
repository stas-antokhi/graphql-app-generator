import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlAppsService {

  private mockURL = 'http://localhost:8080/gql-apps';

  constructor(private http: HttpClient) { }

  getAllApps(): Observable<any> {
    return this.http.get(this.mockURL, { headers: {'Authorization': 'Basic ' + btoa('admin:secret')}});
  }
}
